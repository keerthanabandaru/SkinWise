from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.sql import func
from ..database.connection import Base


class SavedRoutine(Base):
    __tablename__ = "saved_routines"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, default="My Routine")
    morning = Column(JSON, default=list)
    night = Column(JSON, default=list)
    weekly = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
