from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict, Any, List
from ..database.connection import get_db
from ..models.user import User
from ..services.auth import get_current_user

router = APIRouter(prefix="/quiz", tags=["quiz"])


class QuizSubmission(BaseModel):
    answers: Dict[str, Any]


def determine_skin_type(answers: Dict[str, Any]) -> str:
    oily = answers.get("oily", "")
    if "Very oily" in oily:
        return "Oily"
    if "T-zone" in oily:
        return "Combination"
    if "Tight and dry" in oily:
        return "Dry"
    if "Normal" in oily:
        return "Normal"
    return "Combination"


@router.post("/submit")
def submit_quiz(
    submission: QuizSubmission,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    skin_type = determine_skin_type(submission.answers)
    # Save skin_type to user profile
    current_user.skin_type = skin_type
    db.commit()
    db.refresh(current_user)

    return {
        "skin_type": skin_type,
        "concerns": submission.answers.get("concern", []),
        "message": f"Your skin type has been saved as {skin_type}",
    }


@router.get("/result/{user_id}")
def get_result(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"error": "User not found"}
    return {"skin_type": user.skin_type}
