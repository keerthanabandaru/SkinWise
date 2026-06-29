from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # SQLite for local dev, PostgreSQL (Neon/Supabase) for production
    # Set DATABASE_URL in .env or in Render/Railway environment variables
    DATABASE_URL: str = "sqlite:///./skinwise.db"
    SECRET_KEY: str = "dev-secret-key-replace-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days

    # CORS origins — add your Vercel URL after deploying
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:5174,http://localhost:3000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

# Parse allowed origins into a list
CORS_ORIGINS = [o.strip() for o in settings.ALLOWED_ORIGINS.split(",") if o.strip()]
