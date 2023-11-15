from typing import List
from sqlalchemy.orm import Session
from models import Plugin
from datetime import datetime
import pytz

class PluginRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_plugin(self, name: str, version: str, description: str, developer:str) -> Plugin:
        plugin = Plugin(name=name, version=version, description = description, developer = developer)
        self.db.add(plugin)
        self.db.commit()
        self.db.refresh(plugin)
        return plugin

    def get_plugin_by_id(self, plugin_id: int) -> Plugin:
        return self.db.query(Plugin).filter(Plugin.id == plugin_id).first()

    def get_plugin_by_name(self, name: str) -> Plugin:
        return self.db.query(Plugin).filter(Plugin.name == name).first()

    def get_all_plugins(self) -> List[Plugin]:
        return self.db.query(Plugin).all()

    def delete_plugin_by_id(self, plugin_id : int) -> None:
      plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
      if plugin is not None:
        self.db.delete(plugin)
        self.db.commit()

    def update_plugin(self, plugin_id: int, name: str, version: str, description : str, developer: str) -> Plugin:
      existing_plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()

      if existing_plugin is None:
        return None

      existing_plugin.name = name
      existing_plugin.version = version
      existing_plugin.description = description
      existing_plugin.developer = developer
      existing_plugin.last_update_date = datetime.now(pytz.utc)
      self.db.commit()
      return existing_plugin

    def delete_plugin(self, plugin_id: int) -> Plugin:
        existing_plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        if existing_plugin is None:
            return None
        self.db.delete(existing_plugin)
        self.db.commit()
        return existing_plugin

