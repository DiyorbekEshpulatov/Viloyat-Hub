from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
import datetime
from viloyathub.backend.db_mongo import PyObjectId
from bson import ObjectId

# User Activity Log
class ActivityLogBase(BaseModel):
    user_id: UUID
    action: str
    metadata: Optional[dict] = None
    ip: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

class ActivityLogCreate(ActivityLogBase):
    pass

class ActivityLogInDB(ActivityLogBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        json_encoders = {ObjectId: str}
        orm_mode = True
        allow_population_by_field_name = True
