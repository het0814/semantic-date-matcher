"""
Configuration settings for the application
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Moorcheh SDK Configuration
    MOORCHEH_API_KEY: str = os.getenv("MOORCHEH_API_KEY", "your_default_api_key")
    MOORCHEH_NAMESPACE: str = "dating_profiles"
    
    # Database Configuration
    DATABASE_PATH: str = os.getenv("DATABASE_PATH", "profiles.db")
    
    # API Configuration
    API_TITLE: str = "Semantic Date Matcher API"
    API_VERSION: str = "1.0.0"
    
    # CORS Configuration
    CORS_ORIGINS: list = ["*"]  # In production, specify your frontend URL

settings = Settings()