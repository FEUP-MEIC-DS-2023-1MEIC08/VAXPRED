from sqlalchemy.orm import Session
from sqlalchemy import text
from models import Tag
from typing import List, Dict
from models import Plugin
from models import plugin_tag_association
from fastapi import HTTPException

class PluginTagRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_list_dict(self) -> List[Dict[str, int]]:
        table = self.db.query(plugin_tag_association)
        plugin_tag_association_db = [{"plugin_id": row.plugin_id, "tag_id": row.tag_id} for row in table]
        return plugin_tag_association_db

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
                
        
        