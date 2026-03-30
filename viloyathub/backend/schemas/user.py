from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
import datetime

# Base model for common attributes
class UserBase(BaseModel):
    phone: str
    name: str
    email: Optional[EmailStr] = None
    region: str
    district: Optional[str] = None
    business_type: Optional[str] = None
    business_name: Optional[str] = None

# Schema for creating a user
class UserCreate(UserBase):
    pass

# Schema for updating a user
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    region: Optional[str] = None
    district: Optional[str] = None
    business_type: Optional[str] = None
    business_name: Optional[str] = None

# Schema for reading user data (from API)
class User(UserBase):
    id: UUID
    is_premium: bool
    premium_until: Optional[datetime.datetime] = None
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True
