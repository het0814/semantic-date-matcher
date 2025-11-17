"""
Main FastAPI application
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uuid

from .config import settings
from .models import (
    ProfileCreate, 
    ProfileResponse, 
    MatchResult, 
    ProfileCreateResponse
)
from .database import (
    init_db, 
    save_profile, 
    get_profile_by_id, 
    get_all_profiles
)
from .moorcheh import (
    store_in_moorcheh, 
    search_in_moorcheh, 
    generate_combined_text,
    ensure_namespace_exists
)

# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()
    ensure_namespace_exists()  # Ensure Moorcheh namespace is ready

# ========================================
# API Endpoints
# ========================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Semantic Date Matcher API is running",
        "version": settings.API_VERSION
    }

@app.post("/profile", response_model=ProfileCreateResponse)
async def create_profile(profile: ProfileCreate):
    """Create a new user profile"""
    user_id = str(uuid.uuid4())
    
    # Generate combined text for Moorcheh
    combined_text = generate_combined_text(
        profile.about,
        profile.looking_for,
        profile.interests
    )
    
    # Store in Moorcheh
    moorcheh_doc_id = store_in_moorcheh(user_id, combined_text)
    
    # Save to local database
    save_profile(
        user_id=user_id,
        profile_data=profile.dict(),
        moorcheh_doc_id=moorcheh_doc_id
    )
    
    return {
        "user_id": user_id,
        "message": "Profile created successfully"
    }

@app.get("/profiles/{user_id}", response_model=ProfileResponse)
async def get_profile(user_id: str):
    """Get a user profile by ID"""
    profile = get_profile_by_id(user_id)
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return profile

@app.post("/match/{user_id}", response_model=List[MatchResult])
async def find_matches(user_id: str):
    """Find semantic matches for a user"""
    # Get user profile
    profile = get_profile_by_id(user_id)
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Generate combined text for search
    search_query = generate_combined_text(
        profile["about"],
        profile["looking_for"],
        profile["interests"]
    )
    
    # Search in Moorcheh
    search_results = search_in_moorcheh(search_query, top_k=10)
    
    # Filter out the same user and get top 5
    matches = []
    for result in search_results:
        result_user_id = result.get("id")
        
        # Skip if it's the same user
        if result_user_id == user_id:
            continue
        
        # Get full profile for this match
        match_profile = get_profile_by_id(result_user_id)
        
        if match_profile:
            # Create preview (first 100 characters of about)
            preview = match_profile["about"][:100]
            if len(match_profile["about"]) > 100:
                preview += "..."
            
            matches.append({
                "user_id": match_profile["user_id"],
                "name": match_profile["name"],
                "age": match_profile["age"],
                "gender": match_profile["gender"],
                "location": match_profile["location"],
                "score": result.get("score", 0.0),
                "preview": preview
            })
        
        # Stop at 5 matches
        if len(matches) >= 5:
            break
    
    return matches

@app.get("/profiles", response_model=List[ProfileResponse])
async def list_profiles():
    """List all profiles (useful for debugging)"""
    return get_all_profiles()