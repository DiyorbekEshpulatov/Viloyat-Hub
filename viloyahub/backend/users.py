from fastapi import APIRouter

router = APIRouter()

@router.get("/profile")
def get_user_profile():
    return {"message": "User profile data"}

@router.put("/profile")
def update_user_profile():
    return {"message": "Profile updated successfully"}

@router.get("/stats")
def get_user_stats():
    return {"message": "User statistics"}

@router.post("/premium")
def subscribe_to_premium():
    return {"message": "Subscribed to premium"}
