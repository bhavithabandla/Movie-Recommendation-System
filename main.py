from fastapi import FastAPI
from database import Base, engine
from routers import auth, movies
import models
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MovieMood API")

# ✅ Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later, e.g. ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

app.include_router(auth.router)
app.include_router(movies.router)

@app.get("/")
def home():
    return {"message": "Welcome to MovieMood API"}