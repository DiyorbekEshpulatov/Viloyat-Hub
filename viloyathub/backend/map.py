from fastapi import APIRouter

router = APIRouter()

@router.get("/points")
def get_map_points():
    return {"message": "List of map points"}

@router.get("/points/{id}")
def get_point_details(id: int):
    return {"message": f"Details for point {id}"}

@router.get("/nearby")
def get_nearby_points():
    return {"message": "Nearby points based on geolocation"}

@router.get("/regions")
def get_regions():
    return {"message": "List of regions"}
