from sqlalchemy import Column, String, DECIMAL, JSON, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from viloyathub.backend.database import Base

class MapPoint(Base):
    __tablename__ = "map_points"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name = Column(String(200), nullable=False)
    type = Column(String(50), nullable=False)
    lat = Column(DECIMAL(10, 8), nullable=False)
    lng = Column(DECIMAL(11, 8), nullable=False)
    address = Column(String)
    phone = Column(String(20))
    working_hours = Column(JSON)
    region = Column(String(50))
    rating = Column(DECIMAL(2, 1), default=0)
    created_at = Column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP"))
