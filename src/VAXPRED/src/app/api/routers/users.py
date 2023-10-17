from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.user import UserRepository
from schemas.user import UserCreate, UserUpdate, UserResponse, UserListResponse

router = APIRouter()

# Route to list all users
@router.get("/", response_model=UserListResponse)
def get_users(db: Session = Depends(get_db)):
    user_repository = UserRepository(db)
    users = user_repository.get_all_users()
    return {"users": users}

# Route to get a user by ID
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user_repository = UserRepository(db)
    user = user_repository.get_user_by_id(user_id)
    user = next((user for user in db if user.id == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Route to create a new user
@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user_repository = UserRepository(db)

    existing_user = user_repository.get_user_by_username(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this name already exists")
    existing_user = user_repository.get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    new_user = user_repository.create_user(username=user.username, email=user.email)
    return new_user

# Route to update a user
@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    user_repository = UserRepository(db)
    updated_user = user_repository.update_user(user_id, updated_user.username, updated_user.email)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

# Route to delete a user
@router.delete("/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_repository = UserRepository(db)
    deleted_user = user_repository.delete_user(user_id)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_user
