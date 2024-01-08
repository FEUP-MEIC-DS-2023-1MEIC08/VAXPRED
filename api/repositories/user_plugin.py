import datetime

from sqlalchemy.orm import Session
from sqlalchemy import insert
from models import User
from typing import List, Optional, Tuple, Union, Dict
from models import Plugin
from models import user_plugin_association
from fastapi import HTTPException


class UserPluginRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_plugin_associations(self, user_id: int) -> List[Dict[str, Union[int, datetime.datetime]]]:
        user_plugin_associations = self.db.query(
            user_plugin_association.c.plugin_id,
            user_plugin_association.c.association_date,
            user_plugin_association.c.duration
        ).filter(user_plugin_association.c.user_id == user_id).all()

        user_plugin_associations_dict = [
            {"plugin_id": row.plugin_id, "association_date": row.association_date, "duration": row.duration}
            for row in user_plugin_associations
        ]

        return user_plugin_associations_dict

    def get_specific_user_plugin_associations(self, user_id: int, plugin_id: int) -> Tuple[int, int, datetime.datetime, int]:
        user_plugin_associations = self.db.query(
            user_plugin_association.c.user_id,
            user_plugin_association.c.plugin_id,
            user_plugin_association.c.association_date,
            user_plugin_association.c.duration
        ).filter(
            user_plugin_association.c.user_id == user_id,
            user_plugin_association.c.plugin_id == plugin_id
        ).first()

        return user_plugin_associations

    def create_association(self, user_id: int, plugin_id: int, duration: Optional[int] = None) -> User:
        print(duration)
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        user = self.db.query(User).filter(User.id == user_id).first()

        if user is None or plugin is None:
            raise HTTPException(status_code=404, detail="User or plugin not found.")

        try:
            association_values = {'user_id': user_id, 'plugin_id': plugin_id}
            if duration is not None:
                association_values['duration'] = duration

            self.db.execute(insert(user_plugin_association).values(association_values))
            self.db.commit()

            self.db.refresh(user)
            return user
        except Exception:
            raise HTTPException(status_code=500, detail="Internal Server Error.")

    def delete_association(self, user_id: int, plugin_id: int) -> User:
        user = self.db.query(User).filter(User.id == user_id).first()
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        try:
            user.plugins.remove(plugin)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise HTTPException(status_code=404, detail="Could not remove plugin.")
