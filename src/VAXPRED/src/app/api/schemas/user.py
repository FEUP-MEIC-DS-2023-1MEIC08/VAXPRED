from typing import List
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class UserUpdate(BaseModel):
    name:str
    email: str

class UserResponse(BaseModel):
    id: int
    name: str
    version: str

class UserListResponse(BaseModel):
    plugins: List[UserResponse]
