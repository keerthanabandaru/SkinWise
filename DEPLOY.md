# SkinWise AI — Deployment Guide

## Overview

| Service    | Platform | URL (after deploy)                     |
|------------|----------|----------------------------------------|
| Frontend   | Vercel   | https://skinwise-ai.vercel.app         |
| Backend    | Render   | https://skinwise-api.onrender.com      |
| Database   | Neon     | PostgreSQL (free tier, serverless)     |

---

## Step 1 — Set up Neon PostgreSQL (5 minutes)

1. Go to **https://neon.tech** → Sign up free
2. Create a new project → name it `skinwise`
3. Copy the **Connection string** — it looks like:
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Save it — you'll need it in Step 3

---

## Step 2 — Deploy Backend to Render (10 minutes)

1. Go to **https://render.com** → Sign up free
2. Click **New → Web Service**
3. Connect your GitHub repo (push your code first — see Git section below)
4. Settings:
   - **Name**: `skinwise-api`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Environment** tab → Add these variables:
   ```
   DATABASE_URL   = <your Neon connection string from Step 1>
   SECRET_KEY     = <generate a random 32+ char string>
   ALGORITHM      = HS256
   ALLOWED_ORIGINS = https://skinwise-ai.vercel.app
   ```
6. Click **Deploy** — wait ~3 minutes
7. Your API will be at: `https://skinwise-api.onrender.com`
8. Test it: open `https://skinwise-api.onrender.com/health` → should return `{"status": "ok"}`

---

## Step 3 — Deploy Frontend to Vercel (5 minutes)

1. Go to **https://vercel.com** → Sign up free with GitHub
2. Click **New Project** → import your repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Environment Variables** → Add:
   ```
   VITE_API_URL = https://skinwise-api.onrender.com/api
   ```
5. Click **Deploy** — takes ~1 minute
6. Your site is live at: `https://skinwise-ai.vercel.app`

---

## Step 4 — Run Database Migrations on Production

After Render deploys, run migrations against Neon:

```bash
cd backend
# Set your Neon DATABASE_URL locally
set DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require

# Run migrations
venv\Scripts\alembic upgrade head
```

Or add this to Render's **Build Command**:
```
pip install -r requirements.txt && alembic upgrade head
```

---

## Step 5 — Push to GitHub

```bash
cd C:\Users\madir\OneDrive\Desktop\skinwise-ai

git init
git add .
git commit -m "Initial commit — SkinWise AI v1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skinwise-ai.git
git push -u origin main
```

---

## Update CORS after deploying

Once you have your Vercel URL, update Render env var:
```
ALLOWED_ORIGINS = https://skinwise-ai.vercel.app,http://localhost:5173
```

---

## Generating a secure SECRET_KEY

Run this in Python:
```python
import secrets
print(secrets.token_hex(32))
```

---

## Local development (recap)

```bash
# Terminal 1 — Frontend
cd frontend
npm run dev
# → http://localhost:5173

# Terminal 2 — Backend  
cd backend
venv\Scripts\activate
uvicorn main:app --reload --port 8001
# → http://localhost:8001
# → Docs: http://localhost:8001/docs
```
