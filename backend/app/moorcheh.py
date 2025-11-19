from typing import List, Dict, Any
from fastapi import HTTPException
from moorcheh_sdk import MoorchehClient, MoorchehError, ConflictError
import logging

from .config import settings

logging.basicConfig(level=logging.INFO)

_client = None

def get_moorcheh_client() -> MoorchehClient:
    global _client
    if _client is None:
        _client = MoorchehClient(api_key=settings.MOORCHEH_API_KEY)
    return _client

def ensure_namespace_exists():

    client = get_moorcheh_client()
    
    try:
        client.create_namespace(
            namespace_name=settings.MOORCHEH_NAMESPACE,
            type="text"
        )
        print(f"✅ Created namespace: {settings.MOORCHEH_NAMESPACE}")
    except ConflictError:
        print(f"✅ Namespace '{settings.MOORCHEH_NAMESPACE}' already exists")
    except MoorchehError as e:
        print(f"⚠️ Namespace setup error: {e}")

def store_in_moorcheh(user_id: str, combined_text: str) -> str:

    client = get_moorcheh_client()
    
    try:
        client.upload_documents(
            namespace_name=settings.MOORCHEH_NAMESPACE,
            documents=[
                {
                    "id": user_id,
                    "text": combined_text,
                    "metadata": {}
                }
            ]
        )
        print(f"✅ Stored profile {user_id} in Moorcheh")
        return user_id
        
    except MoorchehError as e:
        error_detail = f"Failed to store in Moorcheh: {str(e)}"
        print(f"❌ {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)
    
SEARCH_GUIDANCE_PROMPT = (
    "FIND THE BEST MATCH. The goal is to find the most compatible "
    "partner profile based on the user's description and, most importantly, "
    "what they are looking for."
)    

def search_in_moorcheh(query: str, top_k: int = 10) -> List[Dict[str, Any]]:
    client = get_moorcheh_client()
    
    guided_query = SEARCH_GUIDANCE_PROMPT + "\n\n" + query

    try:
        results = client.search(
            namespaces=[settings.MOORCHEH_NAMESPACE],
            query=guided_query,
            top_k=top_k
        )
        
        return results.get("results", [])
        
    except MoorchehError as e:
        error_detail = f"Failed to search in Moorcheh: {str(e)}"
        print(f"❌ {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)

def generate_combined_text(about: str, looking_for: str, interests: List[str]) -> str:
    """Generate combined text for semantic matching"""
    interests_str = ", ".join(interests)
    combined = (
        f"User Profile Summary:\n"
        f"About Myself: {about}. \n"
        f"I am specifically LOOKING FOR: {looking_for}. \n"
        f"My core interests include: {interests_str}."
    )
    return combined