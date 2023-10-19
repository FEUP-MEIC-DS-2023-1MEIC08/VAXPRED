from sqlalchemy.orm import Session
from sqlalchemy import text
from models import User
from typing import List, Dict
from models import Plugin
from models import user_plugin_association
from fastapi import HTTPException

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
        try:
            user.plugins.append(plugin)
            self.db.commit()
            self.db.refresh(user)
            return user
        except Exception:
            raise HTTPException(status_code=404, detail="Could not add plugin.")
    
    def delete_association(self, user_id: int, plugin_id: int) -> User:        
        query = text("DELETE FROM user_plugin_association WHERE user_id = :user_id AND plugin_id = :plugin_id")
        params = {'user_id': user_id, 'plugin_id': plugin_id}
        try:
            self.db.execute(query, params)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise HTTPException(status_code=404, detail="Could not remove plugin.")
                
        
        