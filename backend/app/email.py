import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import EmailStr
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def send_email(to_email: EmailStr, subject: str, text_content: str, html_content: str):
    # Email configuration
    sender_email = "cyberuestli@gmail.com"
    sender_password = "qcwe lqou iiuj vinz"  # Use an app-specific password or environment variable for security

    # Create message
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = to_email

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text_content, "plain")
    part2 = MIMEText(html_content, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, message.as_string())
        logger.info(f"Email sent successfully to {to_email}")
    except Exception as e:
        logger.error(f"Error sending email to {to_email}: {str(e)}")
        raise

async def send_verification_email(to_email: EmailStr, verification_link: str):
    subject = "Verify your email"
    text_content = f"""
    Hello,

    Click the link below to verify your email address:
    {verification_link}

    If you didn't request this, you can safely ignore this email.

    Best regards,
    Shield Uest
    """
    html_content = f"""
    <html>
      <body>
        <p>Hello,</p>
        <p>Click the link below to verify your email address:</p>
        <a href="{verification_link}">{verification_link}</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>Shield Uest</p>
      </body>
    </html>
    """
    await send_email(to_email, subject, text_content, html_content)

async def send_password_reset_email(to_email: EmailStr, reset_link: str):
    subject = "Reset your password"
    text_content = f"""
    Hello,

    Click the link below to reset your password:
    {reset_link}

    If you didn't request this, you can safely ignore this email.

    Best regards,
    Shield Uest
    """
    html_content = f"""
    <html>
      <body>
        <p>Hello,</p>
        <p>Click the link below to reset your password:</p>
        <a href="{reset_link}">{reset_link}</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>Shield Uest</p>
      </body>
    </html>
    """
    await send_email(to_email, subject, text_content, html_content)