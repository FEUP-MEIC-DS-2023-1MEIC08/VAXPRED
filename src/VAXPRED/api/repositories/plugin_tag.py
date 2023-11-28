from sqlalchemy.orm import Session
from models import Tag
from typing import List
from models import Plugin
from models import plugin_tag_association
from fastapi import HTTPException


class PluginTagRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_plugins_by_tag_id(self, tag_id: int) -> List[int]:
        tag_plugins_associations = self.db.query(
            plugin_tag_association.c.plugin_id,
        ).filter(plugin_tag_association.c.tag_id == tag_id).all()

        plugin_ids = [plugin_id for plugin_id, in tag_plugins_associations]
        return plugin_ids

    def get_tags_by_plugin_id(self, plugin_id: int) -> List[str]:
        tag_plugins_associations = self.db.query(
            plugin_tag_association.c.tag_id,
        ).filter(plugin_tag_association.c.plugin_id == plugin_id).all()

        tag_ids = [tag_id for tag_id, in tag_plugins_associations]

        tags_names = self.db.query(Tag.name).filter(Tag.id.in_(tag_ids)).all()

        tag_names = [name for name, in tags_names]

        return tag_names

    def get_specific_tag_plugin_associations(self, tag_id: int, plugin_id: int) -> bool:
        tag_plugin_associations = self.db.query(
            plugin_tag_association.c.tag_id,
            plugin_tag_association.c.plugin_id,
        ).filter(
            plugin_tag_association.c.tag_id == tag_id,
            plugin_tag_association.c.plugin_id == plugin_id
        ).first()

        return tag_plugin_associations is not None

    def create_association(self, plugin_id: int, tag_id: int) -> Tag:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        tag = self.db.query(Tag).filter(Tag.id == tag_id).first()
        try:
            tag.plugins.append(plugin)
            self.db.commit()
            self.db.refresh(tag)
            return tag
        except Exception:
            raise HTTPException(status_code=404, detail="Could not add tag to plugin.")

    def delete_association(self, plugin_id: int, tag_id: int) -> Tag:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        tag = self.db.query(Tag).filter(Tag.id == tag_id).first()
        try:
            tag.plugins.remove(plugin)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise HTTPException(status_code=404, detail="Could not remove tag from plugin.")
