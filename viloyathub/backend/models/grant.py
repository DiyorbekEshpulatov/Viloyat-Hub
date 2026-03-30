from sqlalchemy import Column, String, BigInteger, Date, Text, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from viloyathub.backend.database import Base

class Grant(Base):
    __tablename__ = "grants"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    title = Column(String(255), nullable=False)
    organization = Column(String(200), nullable=False)
    amount_min = Column(BigInteger)
    amount_max = Column(BigInteger)
    deadline = Column(Date)
    region = Column(String(50))
    sectors = Column(ARRAY(Text))
    description = Column(Text)
    requirements = Column(Text)
    application_url = Column(String(500))
    status = Column(String(20), default='active', nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP"))
