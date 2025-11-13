from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class MovieAction(BaseModel):
    movie_id: int
    movie_title: str

class MovieOut(BaseModel):
    id: int
    movie_id: int
    movie_title: str
    class Config:
        orm_mode = True
