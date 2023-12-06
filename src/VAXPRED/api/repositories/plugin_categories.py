from sqlalchemy.orm import Session
from models import Category
from typing import List
from models import Plugin
from models import plugin_category_association
from fastapi import HTTPException


class PluginCategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_plugins_by_category_id(self, category_id: int) -> List[int]:
        category_plugins_associations = self.db.query(
            plugin_category_association.c.plugin_id,
        ).filter(plugin_category_association.c.category_id == category_id).all()

        plugin_ids = [plugin_id for plugin_id, in category_plugins_associations]
        return plugin_ids

    def get_categories_by_plugin_id(self, plugin_id: int) -> List[str]:
        category_plugins_associations = self.db.query(
            plugin_category_association.c.category_id,
        ).filter(plugin_category_association.c.plugin_id == plugin_id).all()

        category_ids = [category_id for category_id, in category_plugins_associations]

        categories_names = self.db.query(Category.name).filter(Category.id.in_(category_ids)).all()

        category_names = [name for name, in categories_names]

        return category_names

    def get_specific_category_plugin_associations(self, category_id: int, plugin_id: int) -> bool:
        category_plugin_associations = self.db.query(
            plugin_category_association.c.category_id,
            plugin_category_association.c.plugin_id,
        ).filter(
            plugin_category_association.c.category_id == category_id,
            plugin_category_association.c.plugin_id == plugin_id
        ).first()

        return category_plugin_associations is not None

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
