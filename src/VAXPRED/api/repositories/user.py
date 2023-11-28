from sqlalchemy.orm import Session
from models import User
from typing import List


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, username: str, email: str) -> User:
        user = User(username=username, email=email)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_user_by_email(self, email: str) -> User:
        return self.db.query(User).filter(User.email == email).first()

    def get_user_by_username(self, username: str) -> User:
        return self.db.query(User).filter(User.username == username).first()

    def get_user_by_id(self, user_id: int) -> User:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_all_users(self) -> List[User]:
        return self.db.query(User).all()

    def delete_plugin_by_id(self, user_id: int) -> None:
        user = self.db.query(User).filter(User.id == user_id).first()
        if user is not None:
            self.db.delete(user)
            self.db.commit()

    def update_user(self, user_id: int, username: str, email: str) -> User:
        existing_user = self.db.query(User).filter(User.id == user_id).first()
        if existing_user is None:
            return None
        existing_user.username = username
        existing_user.email = email
        self.db.commit()
        return existing_user

    def delete_user(self, user_id: int) -> User:
        existing_user = self.db.query(User).filter(User.id == user_id).first()
        if existing_user is None:
            return None
        self.db.delete(existing_user)
        self.db.commit()
        return existing_user
