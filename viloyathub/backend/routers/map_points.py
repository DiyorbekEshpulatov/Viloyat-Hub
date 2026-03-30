from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

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

@router.post("/", response_model=schemas.MapPoint)
def create_map_point(map_point: schemas.MapPointCreate, db: Session = Depends(get_db)):
    db_map_point = models.MapPoint(**map_point.dict())
    db.add(db_map_point)
    db.commit()
    db.refresh(db_map_point)
    return db_map_point

@router.get("/", response_model=List[schemas.MapPoint])
def read_map_points(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    map_points = db.query(models.MapPoint).offset(skip).limit(limit).all()
    return map_points

@router.get("/{map_point_id}", response_model=schemas.MapPoint)
def read_map_point(map_point_id: UUID, db: Session = Depends(get_db)):
    db_map_point = db.query(models.MapPoint).filter(models.MapPoint.id == map_point_id).first()
    if db_map_point is None:
        raise HTTPException(status_code=404, detail="Map point not found")
    return db_map_point

@router.put("/{map_point_id}", response_model=schemas.MapPoint)
def update_map_point(map_point_id: UUID, map_point: schemas.MapPointUpdate, db: Session = Depends(get_db)):
    db_map_point = db.query(models.MapPoint).filter(models.MapPoint.id == map_point_id).first()
    if db_map_point is None:
        raise HTTPException(status_code=404, detail="Map point not found")
    
    update_data = map_point.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_map_point, key, value)
        
    db.add(db_map_point)
    db.commit()
    db.refresh(db_map_point)
    return db_map_point

@router.delete("/{map_point_id}")
def delete_map_point(map_point_id: UUID, db: Session = Depends(get_db)):
    db_map_point = db.query(models.MapPoint).filter(models.MapPoint.id == map_point_id).first()
    if db_map_point is None:
        raise HTTPException(status_code=404, detail="Map point not found")
    db.delete(db_map_point)
    db.commit()
    return {"message": "Map point deleted successfully"}
