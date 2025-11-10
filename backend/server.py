from fastapi import FastAPI, APIRouter, HTTPException
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

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    phone: Optional[str] = None
    lead_type: str = "general"  # general, strategy_call, resource_download
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactLeadCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    phone: Optional[str] = None
    lead_type: str = "general"

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    company: str
    content: str
    avatar_url: Optional[str] = None
    rating: int = 5

class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    client: str
    challenge: str
    solution: str
    results: List[str]
    metrics: dict
    image_url: Optional[str] = None

class TeamMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    bio: str
    linkedin_url: Optional[str] = None
    avatar_url: Optional[str] = None
    expertise: List[str]

class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    features: List[str]
    case_study_snippet: Optional[str] = None

class Resource(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    type: str  # faq, template, video, article
    content: str
    file_url: Optional[str] = None
    thumbnail_url: Optional[str] = None

class Stats(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    successful_submissions: int = 870
    project_weeks_saved: int = 4000
    client_satisfaction: float = 98.5
    countries_served: int = 47


# Routes
@api_router.get("/")
async def root():
    return {"message": "Maglinc Pharmaceutical Consulting API"}

# Contact/Lead endpoints
@api_router.post("/contacts", response_model=ContactLead)
async def create_contact(input: ContactLeadCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactLead(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactLead])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact['timestamp'], str):
            contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
    return contacts

# Testimonials
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    if not testimonials:
        # Return mock data
        return [
            {
                "id": str(uuid.uuid4()),
                "name": "Dr. Sarah Chen",
                "role": "VP Regulatory Affairs",
                "company": "BioGenix Therapeutics",
                "content": "Maglinc cut our FDA submission timeline by 40%. Their expertise in regulatory strategy is unmatched. We launched 3 months ahead of schedule.",
                "rating": 5
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Marcus Williams",
                "role": "Chief Scientific Officer",
                "company": "PharmaTech Solutions",
                "content": "The team's deep regulatory knowledge and proactive approach saved us from costly compliance issues. Best consulting investment we've made.",
                "rating": 5
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Dr. Amelia Rodriguez",
                "role": "Director of Quality",
                "company": "MedLife Innovations",
                "content": "Working with Maglinc felt like having an extension of our own team. Their documentation expertise is exceptional.",
                "rating": 5
            }
        ]
    return testimonials

# Case Studies
@api_router.get("/case-studies", response_model=List[CaseStudy])
async def get_case_studies():
    case_studies = await db.case_studies.find({}, {"_id": 0}).to_list(100)
    if not case_studies:
        return [
            {
                "id": str(uuid.uuid4()),
                "title": "Accelerated FDA Approval for Novel Oncology Drug",
                "client": "Global Pharma Leader",
                "challenge": "Complex multi-indication approval process with tight deadlines and evolving regulatory landscape.",
                "solution": "Implemented strategic regulatory pathway optimization and parallel processing approach.",
                "results": [
                    "Reduced approval timeline by 5 months",
                    "Zero major deficiencies in FDA review",
                    "Successful simultaneous EU submission"
                ],
                "metrics": {
                    "time_saved": "5 months",
                    "cost_savings": "$12M",
                    "success_rate": "100%"
                },
                "image_url": "https://images.unsplash.com/photo-1587567818566-3272be7d64c9?w=800"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Quality System Remediation & Compliance",
                "client": "Mid-Size Biotech",
                "challenge": "FDA warning letter requiring comprehensive quality system overhaul.",
                "solution": "Rapid assessment, gap analysis, and implementation of robust quality management system.",
                "results": [
                    "Warning letter lifted in 6 months",
                    "Passed re-inspection with zero 483 observations",
                    "Established sustainable compliance framework"
                ],
                "metrics": {
                    "time_to_resolution": "6 months",
                    "observations": "0",
                    "compliance_score": "98%"
                },
                "image_url": "https://images.unsplash.com/photo-1716840646010-e5622fd6683d?w=800"
            }
        ]
    return case_studies

# Team Members
@api_router.get("/team", response_model=List[TeamMember])
async def get_team():
    team = await db.team.find({}, {"_id": 0}).to_list(100)
    if not team:
        return [
            {
                "id": str(uuid.uuid4()),
                "name": "Dr. Jennifer Martinez",
                "role": "Founder & Chief Regulatory Officer",
                "bio": "Former FDA reviewer with 15+ years in pharmaceutical regulation. Led 200+ successful drug approvals.",
                "expertise": ["FDA Strategy", "CMC Review", "IND/NDA Submissions"],
                "avatar_url": "https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?w=400"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Robert Chen, PhD",
                "role": "VP Quality & Compliance",
                "bio": "Quality systems expert with Big Pharma and biotech experience. Specializes in remediation and inspection readiness.",
                "expertise": ["Quality Systems", "GMP Compliance", "Inspection Management"],
                "avatar_url": "https://images.unsplash.com/photo-1758691463198-dc663b8a64e4?w=400"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Dr. Priya Sharma",
                "role": "Director of Regulatory Writing",
                "bio": "Medical writer and regulatory affairs specialist. Authored regulatory documents for 50+ global submissions.",
                "expertise": ["Medical Writing", "Regulatory Documentation", "Global Submissions"],
                "avatar_url": "https://images.unsplash.com/photo-1758691462119-792279713969?w=400"
            }
        ]
    return team

# Services
@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({}, {"_id": 0}).to_list(100)
    if not services:
        return [
            {
                "id": str(uuid.uuid4()),
                "title": "Regulatory Strategy & Planning",
                "description": "Navigate complex regulatory pathways with confidence. We design optimal strategies for global market access.",
                "icon": "map-pin",
                "features": [
                    "Regulatory pathway assessment",
                    "Meeting preparation (FDA, EMA, PMDA)",
                    "Risk mitigation strategies",
                    "Global harmonization planning"
                ],
                "case_study_snippet": "Helped biotech company achieve FDA breakthrough designation"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Regulatory Documentation",
                "description": "Expert preparation of submission-ready regulatory documents that meet global standards.",
                "icon": "file-text",
                "features": [
                    "IND/NDA/BLA preparation",
                    "CTD/eCTD compilation",
                    "Investigator brochures",
                    "Pediatric study plans"
                ],
                "case_study_snippet": "Created complete NDA package in 4 months vs. industry average of 8"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Quality & Compliance",
                "description": "Build robust quality systems that pass inspections and ensure sustainable compliance.",
                "icon": "shield-check",
                "features": [
                    "Quality system design & remediation",
                    "GMP/GCP compliance audits",
                    "Inspection readiness",
                    "CAPA effectiveness review"
                ],
                "case_study_snippet": "Zero FDA 483 observations in last 15 client inspections"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Medical & Scientific Writing",
                "description": "Clear, compelling regulatory narratives that accelerate review and approval.",
                "icon": "pen-tool",
                "features": [
                    "Clinical study reports",
                    "Regulatory responses",
                    "Scientific publications",
                    "Patient-facing materials"
                ],
                "case_study_snippet": "Drafted responses that resolved FDA complete response letter"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Risk Management",
                "description": "Proactive identification and mitigation of regulatory and quality risks.",
                "icon": "alert-triangle",
                "features": [
                    "Risk assessments (ICH Q9)",
                    "Gap analysis",
                    "Deviation investigation",
                    "Change control evaluation"
                ],
                "case_study_snippet": "Prevented costly product recall through early risk identification"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Administrative Support",
                "description": "Streamline your compliance operations with expert administrative assistance.",
                "icon": "folder",
                "features": [
                    "Document management",
                    "Submission tracking",
                    "Regulatory intelligence",
                    "Process optimization"
                ],
                "case_study_snippet": "Reduced administrative burden by 60% for mid-size pharma"
            }
        ]
    return services

# Resources
@api_router.get("/resources", response_model=List[Resource])
async def get_resources():
    resources = await db.resources.find({}, {"_id": 0}).to_list(100)
    if not resources:
        return [
            {
                "id": str(uuid.uuid4()),
                "title": "What is the typical timeline for FDA approval?",
                "type": "faq",
                "content": "Standard FDA review timelines are 10 months (priority) to 12 months (standard) for NDAs. With strategic planning and proactive communication, we help clients accelerate these timelines by 30-40%."
            },
            {
                "id": str(uuid.uuid4()),
                "title": "How do you charge for consulting services?",
                "type": "faq",
                "content": "We offer flexible engagement models: project-based, retainer, or hourly. Pricing depends on scope and complexity. Most clients start with a complimentary strategy session to scope needs and provide a transparent quote."
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Can you help with global submissions?",
                "type": "faq",
                "content": "Absolutely. Our team has experience with FDA, EMA, PMDA, Health Canada, and other global regulatory authorities. We specialize in harmonized global development strategies."
            }
        ]
    return resources

# Stats
@api_router.get("/stats", response_model=Stats)
async def get_stats():
    return Stats()

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