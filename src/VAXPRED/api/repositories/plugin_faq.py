from sqlalchemy.orm import Session
from sqlalchemy import text
from models import FAQ
from typing import List, Dict
from models import Plugin
from models import plugin_faq_association
from fastapi import HTTPException

class PluginFAQRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_list_dict(self) -> List[Dict[str, int]]:
        table = self.db.query(plugin_faq_association)
        plugin_faq_association_db = [{"plugin_id": row.plugin_id, "faq_id": row.faq_id} for row in table]
        return plugin_faq_association_db

    def create_association(self, plugin_id: int, faq_id: int) -> FAQ:
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        faq = self.db.query(FAQ).filter(FAQ.id == faq_id).first()
        try:
            faq.plugins.append(plugin)
            self.db.commit()
            self.db.refresh(faq)
            return faq
        except Exception:
            raise HTTPException(status_code=404, detail="Could not add faq to plugin.")
    
    def delete_association(self, plugin_id: int, faq_id: int) -> FAQ:  
        plugin = self.db.query(Plugin).filter(Plugin.id == plugin_id).first()
        faq = self.db.query(FAQ).filter(FAQ.id == faq_id).first()     
        try:
            faq.plugins.remove(plugin)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise HTTPException(status_code=404, detail="Could not remove faq from plugin.")
                
        
        