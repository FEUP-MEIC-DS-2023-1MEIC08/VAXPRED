from typing import List
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str

class UserUpdate(BaseModel):
    username:str
    email: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

class UserListResponse(BaseModel):
    users: List[UserResponse]
