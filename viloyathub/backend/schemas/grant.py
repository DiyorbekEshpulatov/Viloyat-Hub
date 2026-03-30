from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from uuid import UUID
import datetime

# Base model for grant
class GrantBase(BaseModel):
    title: str
    organization: str
    amount_min: Optional[int] = None
    amount_max: Optional[int] = None
    deadline: Optional[datetime.date] = None
    region: Optional[str] = None
    sectors: Optional[List[str]] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    application_url: Optional[HttpUrl] = None
    status: str = 'active'

# Schema for creating a grant
class GrantCreate(GrantBase):
    pass

# Schema for updating a grant
class GrantUpdate(BaseModel):
    title: Optional[str] = None
    organization: Optional[str] = None
    amount_min: Optional[int] = None
    amount_max: Optional[int] = None
    deadline: Optional[datetime.date] = None
    region: Optional[str] = None
    sectors: Optional[List[str]] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    application_url: Optional[HttpUrl] = None
    status: Optional[str] = None

# Schema for reading grant data
class Grant(GrantBase):
    id: UUID
    created_at: datetime.datetime

    class Config:
        orm_mode = True
