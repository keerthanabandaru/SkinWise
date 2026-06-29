from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin, UserOut, Token, UserUpdate
from ..services.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    if len(user_data.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        age=user_data.age,
        gender=user_data.gender,
        city=user_data.city,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token}


@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token}


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserOut)
def update_me(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    for field, value in update_data.model_dump(exclude_unset=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user
