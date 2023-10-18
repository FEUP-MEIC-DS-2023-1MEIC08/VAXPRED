from sqlalchemy.orm import Session
from models import User
from typing import List
from models import Plugin
from models import user_plugin_association

class UserPluginRepository:
    def __init__(self, db: Session):
        self.db = db
    

    def create_association(self, user_id: int, plugin_id: int) -> User:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        user = self.db.query(User).filter(User.id == user_id).first()
        user.plugins.append(plugin)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user