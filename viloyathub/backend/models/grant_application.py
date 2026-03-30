from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from viloyathub.backend.database import Base

class GrantApplication(Base):
    __tablename__ = "grant_applications"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    grant_id = Column(UUID(as_uuid=True), ForeignKey("grants.id"), nullable=False)
    status = Column(String(20), default='pending', nullable=False)
    applied_at = Column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP"))
    notes = Column(String)

    user = relationship("User")
    grant = relationship("Grant")
