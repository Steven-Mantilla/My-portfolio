from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "unread"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form Endpoints
@api_router.post("/contact")
async def create_contact_message(input: ContactMessageCreate):
    try:
        # Validate input
        if not input.name.strip():
            raise HTTPException(status_code=400, detail="Name is required")
        if not input.message.strip():
            raise HTTPException(status_code=400, detail="Message is required")
        if len(input.message) < 10:
            raise HTTPException(status_code=400, detail="Message must be at least 10 characters")
        
        # Create contact message object
        contact_obj = ContactMessage(**input.model_dump())
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        # Insert into database
        await db.contact_messages.insert_one(doc)
        
        return {
            "success": True,
            "message": "Message sent successfully! I'll get back to you soon.",
            "id": contact_obj.id
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        logging.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again later.")

@api_router.get("/contact")
async def get_contact_messages():
    try:
        # Exclude MongoDB's _id field from the query results
        messages = await db.contact_messages.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for msg in messages:
            if isinstance(msg['timestamp'], str):
                msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
        
        return {
            "success": True,
            "messages": [ContactMessage(**msg) for msg in messages]
        }
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()