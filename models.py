from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    history = relationship("History", back_populates="user")
    watch_later = relationship("WatchLater", back_populates="user")


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer)
    movie_title = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="history")


class WatchLater(Base):
    __tablename__ = "watch_later"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer)
    movie_title = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="watch_later")
