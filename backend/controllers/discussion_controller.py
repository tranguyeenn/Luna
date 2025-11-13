'''
controllers/discussion_controller.py
- Contains logic for creating, updating, and deleting posts/comments
'''

from config.supabase_client import supabase
from utils.error_handler import handle_api_error
from datetime import datetime, timezone

def get_all_discussion():
    '''
    Fetch all discussion posts
    '''

    try:
        response = supabase.table("discussion").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)

def get_discussion_by_id(discussion_id):
    '''
    Fetch a single discussion post by ID
    '''

    try:
        response = supabase.table("discussion").select("*").eq("id", discussion_id).single().execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)
    
def create_discussion(data):
    '''
    Create a new discussion post
    '''
    try:
        if not data.get("user_id") or not data.get("title") or not data.get("content"):
            return {"error": "Missing required fields - user_id, title, content"}
        
        new_post = {
            "user_id": data["user_id"],
            "title": data["title"],
            "content": data["content"],
            "likes": 0,
            "created_at": datetime.now(timezone.utc).isoformat()
        }

        response = supabase.table("discussion").insert(new_post).execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)
    
def update_discussion(discussion_id, data):
    '''
    Update an existing discussion post
    '''

    try:
        update_data = {}
        if "title" in data:
            update_data["title"] = data["title"]
        
        if "content" in data:
            update_data["content"] = data["content"]
        
        if "likes" in data:
            update_data["likes"] = data["likes"]
        
        if not update_data:
            return {"error": "No valid fields to update"}

        response = supabase.table("discussion").update(update_data).eq("id", discussion_id).execute()
        return response.data
    
    except Exception as e:
        return handle_api_error(e)
    
def delete_discussion(discussion_id):
    '''
    Delete a discussion post
    '''

    try: 
        response = supabase.table("discussion").delete().eq("id", discussion_id).execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)