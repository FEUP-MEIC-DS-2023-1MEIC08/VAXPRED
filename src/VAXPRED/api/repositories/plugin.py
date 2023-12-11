from typing import List, Optional
from sqlalchemy.orm import Session
from models import Plugin
from datetime import datetime
import pytz


class PluginRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_plugin(self, name: str, version: str, description: str, developer: str, supplier_name: str,
                      supplier_email: str, price: int, type: str, contract_duration: Optional[int] = None) -> Plugin:
        plugin = Plugin(
            name=name,
            version=version,
            description=description,
            developer=developer,
            supplier_name=supplier_name,
            supplier_email=supplier_email,
            contract_duration=contract_duration,
            search_text=name + description,
            price=price,
            type=type
        )
        self.db.add(plugin)
        self.db.commit()
        self.db.refresh(plugin)
        return plugin

    def get_plugin_by_id(self, plugin_id: int) -> Plugin:
        return self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
    
    def get_plugin_duration_by_id(self, plugin_id: int) -> int:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        if plugin:
            return plugin.contract_duration
        else:
            return None

    def get_plugin_by_name(self, name: str) -> Plugin:
        return self.db.query(Plugin).filter(Plugin.name == name).first()

    def get_all_plugins(self) -> List[Plugin]:
        return self.db.query(Plugin).all()
    
    def get_all_plugins_search(self,search) -> List[Plugin]:
        return self.db.query(Plugin).filter(Plugin.search_text.contains(search)).all()

    def delete_plugin_by_id(self, plugin_id: int) -> None:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        if plugin is not None:
            self.db.delete(plugin)
            self.db.commit()

    def update_plugin(self, plugin_id: int, name: str, version: str, description: str, developer: str,
                      supplier_name: str, supplier_email: str, price: int, type: str,
                      contract_duration: Optional[int] = None) -> Plugin:

        existing_plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()

        if existing_plugin is None:
            return None

        existing_plugin.name = name
        existing_plugin.version = version
        existing_plugin.description = description
        existing_plugin.developer = developer
        existing_plugin.last_update_date = datetime.now(pytz.utc)
        existing_plugin.supplier_name = supplier_name
        existing_plugin.supplier_email = supplier_email
        existing_plugin.contract_duration = contract_duration
        existing_plugin.search_text = name + description
        existing_plugin.price = price
        existing_plugin.type = type
        self.db.commit()
        return existing_plugin

    def delete_plugin(self, plugin_id: int) -> Plugin:
        existing_plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        if existing_plugin is None:
            return None
        self.db.delete(existing_plugin)
        self.db.commit()
        return existing_plugin
