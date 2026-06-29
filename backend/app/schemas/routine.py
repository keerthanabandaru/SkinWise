from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class RoutineCreate(BaseModel):
    name: Optional[str] = "My Routine"
    morning: List[str] = []
    night: List[str] = []
    weekly: List[str] = []


class RoutineOut(BaseModel):
    id: int
    user_id: int
    name: str
    morning: List[str]
    night: List[str]
    weekly: List[str]
    created_at: datetime

    class Config:
        from_attributes = True
