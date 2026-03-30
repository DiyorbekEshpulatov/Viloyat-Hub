from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from viloyathub.backend import models, schemas
from viloyathub.backend.database import SessionLocal

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Grant)
def create_grant(grant: schemas.GrantCreate, db: Session = Depends(get_db)):
    db_grant = models.Grant(**grant.dict())
    db.add(db_grant)
    db.commit()
    db.refresh(db_grant)
    return db_grant

@router.get("/", response_model=List[schemas.Grant])
def read_grants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    grants = db.query(models.Grant).offset(skip).limit(limit).all()
    return grants

@router.get("/{grant_id}", response_model=schemas.Grant)
def read_grant(grant_id: str, db: Session = Depends(get_db)):
    db_grant = db.query(models.Grant).filter(models.Grant.id == grant_id).first()
    if db_grant is None:
        raise HTTPException(status_code=404, detail="Grant not found")
    return db_grant
