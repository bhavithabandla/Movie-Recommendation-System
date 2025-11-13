from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from recommend_model import MovieLensRecommender

router = APIRouter(prefix="/movies", tags=["Movies"])
recommender = MovieLensRecommender("../ml-100k/u.item", "../ml-100k/u.genre")

# In-memory storage for user history/watchlater
user_data = {}

@router.get("/metadata")
def get_metadata():
    return {
        "genres": recommender.get_genres(),
        "languages": ["English", "Hindi", "French", "Korean", "Spanish"],
        "moods": ["Happy", "Sad", "Adventurous", "Romantic", "Thrilling"],
        "durations": ["Short", "Medium", "Long"],
        "types": ["Classic", "Trending", "Underrated"],
    }

@router.post("/recommend")
def recommend_movies(preferences: dict):
    mood = preferences.get("mood", "")
    genre = preferences.get("genre", "")
    language = preferences.get("language", "")
    duration = preferences.get("duration", "")
    type_ = preferences.get("type", "")
    return recommender.recommend(mood, genre, language, duration, type_)

# -------------------------------
# NEW: Watch history & watch later
# -------------------------------
@router.post("/history/{user_id}")
def add_to_history(user_id: str, movie: dict):
    """Add a movie to user's watch history."""
    if user_id not in user_data:
        user_data[user_id] = {"history": [], "watchlater": []}
    if movie not in user_data[user_id]["history"]:
        user_data[user_id]["history"].append(movie)
    return {"message": "Added to history", "data": user_data[user_id]["history"]}

@router.get("/history/{user_id}")
def get_history(user_id: str):
    """Get user's watch history."""
    return user_data.get(user_id, {}).get("history", [])

@router.post("/watchlater/{user_id}")
def add_to_watchlater(user_id: str, movie: dict):
    """Add a movie to watch later list."""
    if user_id not in user_data:
        user_data[user_id] = {"history": [], "watchlater": []}
    if movie not in user_data[user_id]["watchlater"]:
        user_data[user_id]["watchlater"].append(movie)
    return {"message": "Added to watch later", "data": user_data[user_id]["watchlater"]}

@router.get("/watchlater/{user_id}")
def get_watchlater(user_id: str):
    """Get user's watch later list."""
    return user_data.get(user_id, {}).get("watchlater", [])

@router.delete("/history/{user_id}")
def remove_from_history(user_id: str, movie: dict):
    """Remove a movie from user's history"""
    if user_id in user_data and movie in user_data[user_id]["history"]:
        user_data[user_id]["history"].remove(movie)
    return {"message": "Removed from history", "data": user_data[user_id]["history"]}


@router.delete("/watchlater/{user_id}")
def remove_from_watchlater(user_id: str, movie: dict):
    """Remove a movie from user's watch later"""
    if user_id in user_data and movie in user_data[user_id]["watchlater"]:
        user_data[user_id]["watchlater"].remove(movie)
    return {"message": "Removed from watch later", "data": user_data[user_id]["watchlater"]}
