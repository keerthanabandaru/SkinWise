from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    city = Column(String, nullable=True)
    skin_type = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
