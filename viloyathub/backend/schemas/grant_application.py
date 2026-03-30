from pydantic import BaseModel
from typing import Optional
from uuid import UUID
import datetime

# Base model for grant application
class GrantApplicationBase(BaseModel):
    user_id: UUID
    grant_id: UUID
    notes: Optional[str] = None

# Schema for creating an application
class GrantApplicationCreate(GrantApplicationBase):
    pass

# Schema for reading application data
class GrantApplication(GrantApplicationBase):
    id: UUID
    status: str
    applied_at: datetime.datetime

    class Config:
        orm_mode = True
