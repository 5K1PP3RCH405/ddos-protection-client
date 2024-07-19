from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional
from app.database import get_db
from app.models import User, UserCreate, Token, TokenData
from app.email import send_verification_email, send_password_reset_email
import random
import pytz
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define CryptContext for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define OAuth2PasswordBearer scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Define a class for the email verification request
class VerifyEmailRequest(BaseModel):
    token: str

# Define a class for the forgot password request
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# Helper function to get the current UTC time
def get_utc_now():
    return datetime.now(pytz.UTC)

# Initialize the router
router = APIRouter()

# JWT settings
SECRET_KEY = "your-secret-key"  # Change this!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES = 60
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES = 15

# Get the frontend URL from environment variable
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://shielduest.netlify.app")

# Function to verify the password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Function to hash the password
def get_password_hash(password):
    return pwd_context.hash(password)

# Function to create an access token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Function to get a user by email
async def get_user(db: AsyncSession, email: str):
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalars().first()

# Function to authenticate a user
async def authenticate_user(db: AsyncSession, email: str, password: str):
    user = await get_user(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# Function to generate an email verification token
def create_email_verification_token(email: str):
    expires_delta = timedelta(minutes=EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES)
    return create_access_token(data={"sub": email}, expires_delta=expires_delta)

# Function to generate a password reset token
def create_password_reset_token(email: str):
    expires_delta = timedelta(minutes=PASSWORD_RESET_TOKEN_EXPIRE_MINUTES)
    return create_access_token(data={"sub": email, "type": "password_reset"}, expires_delta=expires_delta)

# Function to get the current authenticated user
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await get_user(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

# Function to get the current active user
async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Endpoint to register a new user
@router.post("/register", response_model=Token)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await get_user(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    verification_token = create_email_verification_token(user.email)
    expiration_time = get_utc_now() + timedelta(minutes=EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES)

    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        is_active=False,
        email_verification_token=verification_token,
        email_verification_token_expires=expiration_time,
        created_at=get_utc_now(),
        updated_at=get_utc_now()
    )
    
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    
    verification_link = f"{FRONTEND_URL}/verify-email?token={verification_token}"
    
    await send_verification_email(user.email, verification_link)
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint to verify the email
@router.post("/verify-email")
async def verify_email(request: VerifyEmailRequest, db: AsyncSession = Depends(get_db)):
    logger.info(f"Verifying token: {request.token}")
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(request.token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            logger.error("Email not found in token payload")
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError as e:
        logger.error(f"JWTError: {str(e)}")
        raise credentials_exception

    user = await get_user(db, email=token_data.email)
    if not user:
        logger.error(f"User not found for email: {token_data.email}")
        raise HTTPException(status_code=404, detail="User not found")
    
    logger.info(f"User found: {user.email}")
    logger.info(f"Stored token: {user.email_verification_token}")
    logger.info(f"Received token: {request.token}")
    
    if user.email_verification_token != request.token:
        logger.error("Invalid token provided for email verification.")
        raise HTTPException(status_code=400, detail="Invalid token provided for email verification.")
    
    if user.email_verification_token_expires < get_utc_now():
        logger.error("Verification token has expired.")
        raise HTTPException(status_code=400, detail="Verification token has expired.")

    user.is_active = True
    user.email_verification_token = None  # Clear the token
    user.email_verification_token_expires = None  # Clear the token expiry
    await db.commit()
    
    logger.info("Email verified successfully")
    return {"message": "Email verified successfully"}

# Endpoint for user login
@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    logger.info(f"Login attempt for user: {form_data.username}")
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        logger.error(f"Invalid credentials for user: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        logger.error(f"Inactive user attempt to login: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    logger.info(f"Successful login for user: {form_data.username}")
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint for forgot password
@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    user = await get_user(db, email=request.email)
    if not user:
        logger.warning(f"Forgot password request for non-existent user: {request.email}")
        return {"message": "If the email exists, a password reset link will be sent."}

    password_reset_token = create_password_reset_token(user.email)
    reset_link = f"{FRONTEND_URL}/reset-password?token={password_reset_token}"

    try:
        await send_password_reset_email(user.email, reset_link)
        logger.info(f"Password reset email sent to: {user.email}")
        return {"message": "Password reset link has been sent to your email."}
    except Exception as e:
        logger.error(f"Failed to send password reset email to {user.email}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send password reset email")