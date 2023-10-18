from sqlalchemy.orm import Session
from models import User
from typing import List, Dict
from models import Plugin
from models import user_plugin_association

class UserPluginRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_list_dict(self) -> List[Dict[str, int]]:
        table = self.db.query(user_plugin_association)
        user_plugin_association_db = [{"user_id": row.user_id, "plugin_id": row.plugin_id} for row in table]
        return user_plugin_association_db

    def create_association(self, user_id: int, plugin_id: int) -> User:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        user = self.db.query(User).filter(User.id == user_id).first()
        user.plugins.append(plugin)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user