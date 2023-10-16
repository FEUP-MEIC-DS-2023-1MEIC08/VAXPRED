from typing import List

from sqlalchemy.orm import Session
from ..models.plugin import Plugin

class PluginRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_plugin(self, name: str, version: str) -> Plugin:
        plugin = Plugin(name=name, version=version)
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

