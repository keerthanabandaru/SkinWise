from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import Base, engine
from app.routers import auth, routines, quiz
from app.models import user, routine  # noqa: registers models with SQLAlchemy
from app.config import CORS_ORIGINS

# Auto-create tables on startup (works for both SQLite dev and PostgreSQL prod)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SkinWise AI API",
    description="Backend API for SkinWise AI — personalised skincare for India",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/api")
app.include_router(routines.router, prefix="/api")
app.include_router(quiz.router,     prefix="/api")


@app.get("/")
def root():
    return {"message": "SkinWise AI API is running 🌿", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
