from sqlalchemy.orm import Session
from sqlalchemy import text
from models import Category
from typing import List, Dict
from models import Plugin
from models import plugin_category_association
from fastapi import HTTPException

class PluginCategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_list_dict(self) -> List[Dict[str, int]]:
        table = self.db.query(plugin_category_association)
        plugin_category_association_db = [{"plugin_id": row.plugin_id, "category_id": row.category_id} for row in table]
        return plugin_category_association_db

    def create_association(self, plugin_id: int, category_id: int) -> Category:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        category = self.db.query(Category).filter(Category.id == category_id).first()
        try:
            category.plugins.append(plugin)
            self.db.commit()
            self.db.refresh(category)
            return category
        except Exception:
            raise HTTPException(status_code=404, detail="Could not add category to plugin.")
    
    def delete_association(self, plugin_id: int, category_id: int) -> Category:  
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        category = self.db.query(Category).filter(Category.id == category_id).first()     
        try:
            category.plugins.remove(plugin)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise HTTPException(status_code=404, detail="Could not remove category from plugin.")
            