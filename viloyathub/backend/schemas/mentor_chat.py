from pydantic import BaseModel, Field
from typing import Optional, Literal
from uuid import UUID
import datetime
from viloyathub.backend.db_mongo import PyObjectId
from bson import ObjectId

# Chat Session
class ChatSessionBase(BaseModel):
    user_id: UUID
    started_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
    ended_at: Optional[datetime.datetime] = None
    messages_count: int = 0
    resolved: bool = False

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSessionInDB(ChatSessionBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        json_encoders = {ObjectId: str}
        orm_mode = True
        allow_population_by_field_name = True

# Chat Message
class ChatMessageBase(BaseModel):
    session_id: PyObjectId
    role: Literal["user", "assistant", "system"]
    content: str
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
    metadata: Optional[dict] = None

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessageInDB(ChatMessageBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        json_encoders = {ObjectId: str}
        orm_mode = True
        allow_population_by_field_name = True
