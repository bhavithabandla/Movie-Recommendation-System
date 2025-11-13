from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException
import bcrypt

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode()
    db_user = models.User(email=user.email, password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return user

def add_to_history(db: Session, user_id: int, movie: schemas.MovieAction):
    entry = models.History(user_id=user_id, movie_id=movie.movie_id, movie_title=movie.movie_title)
    db.add(entry)
    db.commit()
    return entry

def add_to_watch_later(db: Session, user_id: int, movie: schemas.MovieAction):
    entry = models.WatchLater(user_id=user_id, movie_id=movie.movie_id, movie_title=movie.movie_title)
    db.add(entry)
    db.commit()
    return entry

def get_history(db: Session, user_id: int):
    return db.query(models.History).filter(models.History.user_id == user_id).all()

def get_watch_later(db: Session, user_id: int):
    return db.query(models.WatchLater).filter(models.WatchLater.user_id == user_id).all()
