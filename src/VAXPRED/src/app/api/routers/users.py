from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()


class User(BaseModel):
    id: int
    username: str
    email: str


# Simulating a list of users
users_db = [
  User(id=1, username="user1", email="user1@example.com"),
  User(id=2, username="user2", email="user2@example.com"),
]


# Route to list all users
@router.get("/", response_model=List[User])
def get_users():
    return users_db


# Route to get a user by ID
@router.get("/{user_id}", response_model=User)
def get_user(user_id: int):
    user = next((user for user in users_db if user.id == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Route to create a new user
@router.post("/", response_model=User)
def create_user(user: User):
    user.id = max(user.id for user in users_db) + 1
    users_db.append(user)
    return user


# Route to update a user
@router.put("/{user_id}", response_model=User)
def update_user(user_id: int, updated_user: User):
    for user in users_db:
        if user.id == user_id:
            user.username = updated_user.username
            user.email = updated_user.email
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Route to delete a user
@router.delete("/{user_id}", response_model=User)
def delete_user(user_id: int):
    for user in users_db:
        if user.id == user_id:
            users_db.remove(user)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
