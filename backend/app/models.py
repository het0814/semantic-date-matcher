"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field
from typing import List, Optional

class ProfileCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=18, le=120)
    gender: str = Field(..., pattern="^(male|female|other)$")
    location: str = Field(..., min_length=1, max_length=200)
    about: str = Field(..., min_length=10, max_length=1000)
    looking_for: str = Field(..., min_length=10, max_length=1000)
    interests: List[str] = Field(..., min_items=1, max_items=20)

class ProfileResponse(BaseModel):
    user_id: str
    name: str
    age: int
    gender: str
    location: str
    about: str
    looking_for: str
    interests: List[str]
    moorcheh_doc_id: Optional[str] = None

class MatchResult(BaseModel):
    user_id: str
    name: str
    age: int
    gender: str
    location: str
    score: float
    preview: str

class ProfileCreateResponse(BaseModel):
    user_id: str
    message: str