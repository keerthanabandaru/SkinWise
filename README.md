# SkinWise AI

Personalised skincare for every Indian skin type. Science-backed routines, ingredient education, and product recommendations.

## Project Structure

```
skinwise-ai/
├── frontend/        React + Vite + Tailwind CSS
└── backend/         FastAPI + SQLAlchemy + PostgreSQL
```

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at http://localhost:5173

## Running the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
API runs at http://localhost:8000  
Docs at http://localhost:8000/docs

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:
- `DATABASE_URL` — PostgreSQL URL (or leave as SQLite for dev)
- `SECRET_KEY` — A random secret string

## Tech Stack

| Layer    | Technology                       |
|----------|----------------------------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| Backend  | Python 3.11, FastAPI             |
| Database | PostgreSQL (SQLite for dev)      |
| Auth     | JWT (python-jose + bcrypt)       |
| Hosting  | Vercel (frontend), Render (API)  |

## Pages

- `/` — Home with hero, search, concerns, ingredients, products, blog
- `/quiz` — 7-question skin type quiz with instant results
- `/skin-library` — Browse skin concerns (acne, dryness, pigmentation, etc.)
- `/skin-library/:slug` — Detailed concern page with routine + ingredients
- `/ingredients` — Ingredient library with filter by category
- `/ingredients/:slug` — Ingredient detail (benefits, combos, products)
- `/products` — Product catalogue with filters (brand, skin type, concern, price)
- `/routine-builder` — Drag-and-drop morning/night routine builder
- `/dashboard` — User dashboard (requires login)
- `/login` / `/register` — Auth pages
- `/profile` — Edit profile
- `/blog` — Articles
- `/about` — About page
