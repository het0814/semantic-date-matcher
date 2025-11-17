"""
Database connection and operations
"""
import sqlite3
import json
from contextlib import contextmanager
from typing import Optional, List
from .config import settings

def init_db():
    """Initialize SQLite database with profiles table"""
    conn = sqlite3.connect(settings.DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS profiles (
            user_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            gender TEXT NOT NULL,
            location TEXT NOT NULL,
            about TEXT NOT NULL,
            looking_for TEXT NOT NULL,
            interests TEXT NOT NULL,
            moorcheh_doc_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    conn.close()

@contextmanager
def get_db():
    """Context manager for database connections"""
    conn = sqlite3.connect(settings.DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def save_profile(user_id: str, profile_data: dict, moorcheh_doc_id: str):
    """Save profile to database"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO profiles (
                user_id, name, age, gender, location, 
                about, looking_for, interests, moorcheh_doc_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            user_id,
            profile_data["name"],
            profile_data["age"],
            profile_data["gender"],
            profile_data["location"],
            profile_data["about"],
            profile_data["looking_for"],
            json.dumps(profile_data["interests"]),
            moorcheh_doc_id
        ))
        conn.commit()

def get_profile_by_id(user_id: str) -> Optional[dict]:
    """Fetch profile from database"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        
        if row:
            return {
                "user_id": row["user_id"],
                "name": row["name"],
                "age": row["age"],
                "gender": row["gender"],
                "location": row["location"],
                "about": row["about"],
                "looking_for": row["looking_for"],
                "interests": json.loads(row["interests"]),
                "moorcheh_doc_id": row["moorcheh_doc_id"]
            }
        return None

def get_all_profiles() -> List[dict]:
    """Fetch all profiles"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profiles ORDER BY created_at DESC")
        rows = cursor.fetchall()
        
        profiles = []
        for row in rows:
            profiles.append({
                "user_id": row["user_id"],
                "name": row["name"],
                "age": row["age"],
                "gender": row["gender"],
                "location": row["location"],
                "about": row["about"],
                "looking_for": row["looking_for"],
                "interests": json.loads(row["interests"]),
                "moorcheh_doc_id": row["moorcheh_doc_id"]
            })
        
        return profiles