from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.user import UserRepository
from schemas.user import UserCreate, UserUpdate, UserResponse, UserListResponse


router = APIRouter()


# class User(BaseModel):
#     id: int
#     username: str
#     email: str


# # Simulating a list of users
# users_db = [
#   User(id=1, username="user1", email="user1@example.com"),
#   User(id=2, username="user2", email="user2@example.com"),
# ]


# Route to list all users
@router.get("/", response_model=UserListResponse)
def get_users(db: Session = Depends(get_db)):
    return db


# Route to get a user by ID
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = next((user for user in db if user.id == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Route to create a new user
@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user_repository = UserRepository(db)

    existing_user = user_repository.get_user_by_name(user.name)
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this name already exists")

    new_user = user_repository.create_user(name=user.name, version=user.version)
    return new_user


# Route to update a user
@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    for user in db:
        if user.id == user_id:
            user.username = updated_user.username
            user.email = updated_user.email
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Route to delete a user
@router.delete("/{user_id}", response_model=UserResponse)
def delete_user(user_id: int):
    for user in users_db:
        if user.id == user_id:
            users_db.remove(user)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
