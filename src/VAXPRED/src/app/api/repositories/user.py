from sqlalchemy.orm import Session
from models import User
from models import user_plugin_association

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, name: str, version: str) -> User:
        user = User(name=name, version=version)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def get_user_by_email(self, name: str, version: str) -> User:
        user = User(name=name, version=version)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user




