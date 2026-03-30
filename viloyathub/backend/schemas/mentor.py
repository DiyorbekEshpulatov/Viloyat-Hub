
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ChatMessageBase(BaseModel):
    content: str

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessage(ChatMessageBase):
    id: int
    session_id: int
    role: str
    created_at: datetime

    class Config:
        orm_mode = True

class ChatSessionBase(BaseModel):
    user_id: int

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSession(ChatSessionBase):
    id: int
    created_at: datetime
    messages: List[ChatMessage] = []

    class Config:
        orm_mode = True
