from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.connection import get_db
from ..models.routine import SavedRoutine
from ..models.user import User
from ..schemas.routine import RoutineCreate, RoutineOut
from ..services.auth import get_current_user

router = APIRouter(prefix="/routines", tags=["routines"])


@router.get("", response_model=List[RoutineOut])
def get_routines(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(SavedRoutine).filter(SavedRoutine.user_id == current_user.id).all()


@router.post("", response_model=RoutineOut, status_code=201)
def save_routine(
    routine_data: RoutineCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    routine = SavedRoutine(
        user_id=current_user.id,
        name=routine_data.name,
        morning=routine_data.morning,
        night=routine_data.night,
        weekly=routine_data.weekly,
    )
    db.add(routine)
    db.commit()
    db.refresh(routine)
    return routine


@router.delete("/{routine_id}", status_code=204)
def delete_routine(
    routine_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    routine = db.query(SavedRoutine).filter(
        SavedRoutine.id == routine_id,
        SavedRoutine.user_id == current_user.id
    ).first()
    if not routine:
        raise HTTPException(status_code=404, detail="Routine not found")
    db.delete(routine)
    db.commit()
