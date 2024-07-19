from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.auth import get_current_active_user
from app.models import User
from datetime import datetime, timedelta
import random

router = APIRouter()

@router.get("/protection-status")
async def get_protection_status(current_user: User = Depends(get_current_active_user)):
    # In a real application, you would fetch this from the database
    return {"status": True}

@router.post("/toggle-protection")
async def toggle_protection(status: bool, current_user: User = Depends(get_current_active_user)):
    # In a real application, you would update this in the database
    return {"status": status}

@router.get("/user-profile")
async def get_user_profile(current_user: User = Depends(get_current_active_user)):
    return {"username": current_user.name, "email": current_user.email}

@router.get("/traffic-data")
async def get_traffic_data(current_user: User = Depends(get_current_active_user)):
    # In a real application, you would fetch this from the database
    today = random.uniform(0.5, 5.0)
    this_month = random.uniform(30, 100)
    
    chart_data = {
        "labels": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        "datasets": [{
            "label": 'Traffic Data',
            "data": [random.randint(40, 100) for _ in range(7)],
        }]
    }
    
    return {
        "today": f"{today:.1f} GB",
        "thisMonth": f"{this_month:.1f} GB",
        "chartData": chart_data
    }

@router.get("/threats-data")
async def get_threats_data(current_user: User = Depends(get_current_active_user)):
    # In a real application, you would fetch this from the database
    return {
        "today": random.randint(50, 300),
        "thisMonth": random.randint(1000, 5000)
    }

@router.get("/recent-activity")
async def get_recent_activity(current_user: User = Depends(get_current_active_user)):
    # In a real application, you would fetch this from the database
    activities = [
        "DDoS Attack Prevented",
        "Configuration Updated",
        "New IP Whitelisted",
        "Traffic Spike Detected",
        "System Maintenance Performed"
    ]
    
    recent_activities = []
    for i in range(5):
        date = (datetime.now() - timedelta(days=i)).strftime("%b %d")
        event = random.choice(activities)
        recent_activities.append({"date": date, "event": event})
    
    return recent_activities