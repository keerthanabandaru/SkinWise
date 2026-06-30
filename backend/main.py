from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, routines, quiz
from app.config import CORS_ORIGINS

app = FastAPI(
    title="SkinWise API",
    description="Backend API for SkinWise — personalised skincare for India",
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


@app.on_event("startup")
async def startup():
    """Create tables on startup — safe for both SQLite and PostgreSQL."""
    from app.database.connection import Base, engine
    from app.models import user, routine  # noqa
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "SkinWise API is running 🌿", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
