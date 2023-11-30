from sqlalchemy.orm import Session
from sqlalchemy import text
from models import Image
from typing import List, Dict
from models import Plugin
from models import plugin_image_association
from fastapi import HTTPException

class PluginImageRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_list_dict(self) -> List[Dict[str, int]]:
        table = self.db.query(plugin_image_association)
        plugin_image_association_db = [{"plugin_id": row.plugin_id, "image_id": row.image_id} for row in table]
        return plugin_image_association_db
    

    def get_images_by_plugin_id(self, plugin_id: int) -> List[str]:
        image_plugins_associations = self.db.query(
            plugin_image_association.c.image_id,
        ).filter(plugin_image_association.c.plugin_id == plugin_id).all()

        image_ids = [image_id for image_id, in image_plugins_associations]

        images_paths = self.db.query(Image.path).filter(Image.id.in_(image_ids)).all()

        image_paths = [path for path, in images_paths]

        return image_paths

    def create_association(self, plugin_id: int, image_id: int) -> Image:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        image = self.db.query(Image).filter(Image.id == image_id).first()
        try:
            image.plugins.append(plugin)
            self.db.commit()
            self.db.refresh(image)
            return image
        except Exception:
            raise HTTPException(status_code=404, detail="Could not add image to plugin.")
    
    def delete_association(self, plugin_id: int, image_id: int) -> Image:  
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        image = self.db.query(Image).filter(Image.id == image_id).first()
        print(plugin.id) 
        print(image.plugins)   
        try:
            image.plugins.remove(plugin)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise HTTPException(status_code=404, detail="Could not remove image from plugin.")
                
        
        