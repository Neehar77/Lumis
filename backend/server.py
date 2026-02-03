from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== MODELS ====================

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    services: List[str] = []
    reason: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    services: List[str] = []
    reason: Optional[str] = None
    message: str

class AppointmentRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    date: str
    time: str
    services: List[str] = []
    reason: Optional[str] = None
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AppointmentRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    date: str
    time: str
    services: List[str] = []
    reason: Optional[str] = None
    message: Optional[str] = None

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    role: str
    content: str
    rating: int = 5

class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    industry: str
    challenge: str
    solution: str
    results: List[str]
    image_url: str
    pdf_filename: Optional[str] = None

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    category: str
    author: str
    image_url: str
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "coming_soon"

# ==================== SEED DATA ====================

TESTIMONIALS = [
    {
        "id": "1",
        "name": "Sarah Chen",
        "company": "TechFlow Inc.",
        "role": "CTO",
        "content": "Lumis transformed our operations with their AI automation solutions. We reduced manual tasks by 70% and saw ROI within 3 months.",
        "rating": 5
    },
    {
        "id": "2",
        "name": "Michael Rodriguez",
        "company": "ScaleUp Ventures",
        "role": "CEO",
        "content": "Their DevOps expertise helped us achieve 99.9% uptime. The team is incredibly responsive and technically brilliant.",
        "rating": 5
    },
    {
        "id": "3",
        "name": "Emily Watson",
        "company": "DataDrive Analytics",
        "role": "VP Engineering",
        "content": "The AI agents Lumis built for us handle customer inquiries 24/7. Support costs down 50%, customer satisfaction up 40%.",
        "rating": 5
    },
    {
        "id": "4",
        "name": "James Park",
        "company": "CloudFirst Solutions",
        "role": "Director of IT",
        "content": "Database optimization and cloud migration was seamless. Lumis delivered on time and under budget. Highly recommend!",
        "rating": 5
    },
    {
        "id": "5",
        "name": "Lisa Thompson",
        "company": "RetailPro",
        "role": "COO",
        "content": "From website redesign to backend automation, Lumis handled everything professionally. Our e-commerce conversion rate doubled.",
        "rating": 5
    }
]

CASE_STUDIES = [
    {
        "id": "cs1",
        "title": "AI-Powered Customer Service Automation",
        "company": "FinanceHub Global",
        "industry": "Financial Services",
        "challenge": "Manual customer support handling 10,000+ daily inquiries with 48-hour response times.",
        "solution": "Deployed intelligent AI agents with natural language processing, integrated with existing CRM systems.",
        "results": [
            "Response time reduced to under 5 minutes",
            "70% of inquiries resolved without human intervention",
            "Customer satisfaction improved by 45%",
            "$2M annual savings in support costs"
        ],
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        "pdf_filename": "case_study_financehub.pdf"
    },
    {
        "id": "cs2",
        "title": "Cloud Infrastructure Modernization",
        "company": "MedTech Innovations",
        "industry": "Healthcare Technology",
        "challenge": "Legacy on-premise infrastructure causing reliability issues and compliance concerns.",
        "solution": "Full cloud migration to AWS with HIPAA-compliant architecture and automated scaling.",
        "results": [
            "99.99% uptime achieved",
            "40% reduction in infrastructure costs",
            "Full HIPAA compliance maintained",
            "Deployment time reduced from weeks to hours"
        ],
        "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        "pdf_filename": "case_study_medtech.pdf"
    },
    {
        "id": "cs3",
        "title": "E-Commerce Platform Optimization",
        "company": "StyleNow Retail",
        "industry": "E-Commerce",
        "challenge": "Slow website performance and poor mobile experience affecting sales conversion.",
        "solution": "Complete frontend rebuild with React, database optimization, and CDN implementation.",
        "results": [
            "Page load time reduced by 65%",
            "Mobile conversion rate increased 120%",
            "Black Friday traffic handled seamlessly",
            "SEO rankings improved significantly"
        ],
        "image_url": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
        "pdf_filename": "case_study_stylenow.pdf"
    }
]

BLOG_POSTS = [
    {
        "id": "blog1",
        "title": "The Future of AI Agents in Business Automation",
        "excerpt": "Discover how intelligent AI agents are revolutionizing business operations and what it means for your company's competitive edge.",
        "category": "AI & Automation",
        "author": "Lumis Team",
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
        "status": "coming_soon"
    },
    {
        "id": "blog2",
        "title": "DevOps Best Practices for Startups",
        "excerpt": "Essential DevOps strategies that help startups scale efficiently while maintaining reliability and security.",
        "category": "DevOps",
        "author": "Lumis Team",
        "image_url": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600",
        "status": "coming_soon"
    },
    {
        "id": "blog3",
        "title": "Database Optimization: A Complete Guide",
        "excerpt": "Learn proven techniques to optimize your database performance and reduce costs without compromising data integrity.",
        "category": "Database",
        "author": "Lumis Team",
        "image_url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600",
        "status": "coming_soon"
    }
]

SERVICES = [
    {
        "id": "svc1",
        "name": "AI Agent Building",
        "description": "Custom AI agents that automate workflows, handle customer interactions, and drive intelligent decision-making.",
        "icon": "brain"
    },
    {
        "id": "svc2",
        "name": "Automation Software",
        "description": "End-to-end automation solutions that eliminate repetitive tasks and streamline your business processes.",
        "icon": "bot"
    },
    {
        "id": "svc3",
        "name": "Web Development",
        "description": "Modern, responsive websites and web applications built with cutting-edge technologies.",
        "icon": "globe"
    },
    {
        "id": "svc4",
        "name": "DevOps & Cloud",
        "description": "Infrastructure automation, CI/CD pipelines, and cloud migration for scalable, reliable systems.",
        "icon": "server"
    },
    {
        "id": "svc5",
        "name": "Database Solutions",
        "description": "Database design, optimization, migration, and maintenance for peak performance.",
        "icon": "database"
    }
]

# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Lumis API - Illuminating the Future of IT"}

# Contact Form
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(input: ContactSubmissionCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactSubmission(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(100)
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    return contacts

# Appointments
@api_router.post("/appointments", response_model=AppointmentRequest)
async def create_appointment(input: AppointmentRequestCreate):
    appointment_dict = input.model_dump()
    appointment_obj = AppointmentRequest(**appointment_dict)
    
    doc = appointment_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.appointments.insert_one(doc)
    return appointment_obj

@api_router.get("/appointments", response_model=List[AppointmentRequest])
async def get_appointments():
    appointments = await db.appointments.find({}, {"_id": 0}).to_list(100)
    for apt in appointments:
        if isinstance(apt.get('created_at'), str):
            apt['created_at'] = datetime.fromisoformat(apt['created_at'])
    return appointments

# Testimonials (static data)
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    return TESTIMONIALS

# Case Studies (static data)
@api_router.get("/case-studies")
async def get_case_studies():
    return CASE_STUDIES

@api_router.get("/case-studies/{case_study_id}")
async def get_case_study(case_study_id: str):
    for cs in CASE_STUDIES:
        if cs["id"] == case_study_id:
            return cs
    raise HTTPException(status_code=404, detail="Case study not found")

# Blog Posts (static data)
@api_router.get("/blog-posts")
async def get_blog_posts():
    return BLOG_POSTS

# Services (static data)
@api_router.get("/services")
async def get_services():
    return SERVICES

# Available time slots for appointments
@api_router.get("/available-times")
async def get_available_times():
    return {
        "times": [
            "09:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "01:00 PM",
            "02:00 PM",
            "03:00 PM",
            "04:00 PM",
            "05:00 PM"
        ]
    }

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
