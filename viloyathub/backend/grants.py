from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_grants():
    return {"message": "List of grants"}

@router.get("/{id}")
def get_grant_details(id: int):
    return {"message": f"Details for grant {id}"}

@router.get("/match")
def get_matched_grants():
    return {"message": "AI-matched grants"}

@router.post("/apply")
def apply_for_grant():
    return {"message": "Grant application endpoint"}

@router.get("/applications")
def get_grant_applications():
    return {"message": "History of grant applications"}
