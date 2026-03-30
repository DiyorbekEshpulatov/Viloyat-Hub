from pydantic import BaseModel, condecimal
from typing import Optional, Dict
from uuid import UUID
import datetime

# Base model for map point
class MapPointBase(BaseModel):
    name: str
    type: str
    lat: condecimal(max_digits=10, decimal_places=8)
    lng: condecimal(max_digits=11, decimal_places=8)
    address: Optional[str] = None
    phone: Optional[str] = None
    working_hours: Optional[Dict] = None
    region: Optional[str] = None

# Schema for creating a map point
class MapPointCreate(MapPointBase):
    pass

# Schema for updating a map point
class MapPointUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    lat: Optional[condecimal(max_digits=10, decimal_places=8)] = None
    lng: Optional[condecimal(max_digits=11, decimal_places=8)] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    working_hours: Optional[Dict] = None
    region: Optional[str] = None

# Schema for reading map point data
class MapPoint(MapPointBase):
    id: UUID
    rating: Optional[condecimal(max_digits=2, decimal_places=1)] = None
    created_at: datetime.datetime

    class Config:
        orm_mode = True
