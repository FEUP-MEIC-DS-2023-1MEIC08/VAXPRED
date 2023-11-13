from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_faq import PluginFAQRepository
from repositories.plugin import PluginRepository
from repositories.faq import FAQRepository
from typing import List, Dict
from schemas.plugin import PluginListResponse
from schemas.faq import FAQListResponse

router = APIRouter()

# Route to list plugins associated with a faq
@router.get("/{faq_id}/plugins/", response_model=PluginListResponse)
def get_faq_plugins(faq_id: int, db: Session = Depends(get_db)):
    association_db = PluginFAQRepository(db).get_list_dict()
    faq_plugins = []
    plugin_repository = PluginRepository(db)
    for association in association_db:
        if association["faq_id"] == faq_id:
            tempPlugin = plugin_repository.get_plugin_by_id(association["plugin_id"])
            faq_plugins.append(tempPlugin)
    return {"plugins": faq_plugins}

# Route to list of faqs associated with a plugin
@router.get("/{plugin_id}/", response_model=FAQListResponse)
def get_plugin_faqs(plugin_id: int, db: Session = Depends(get_db)):
    association_db = PluginFAQRepository(db).get_list_dict()
    plugin_faqs = []
    faq_repository = FAQRepository(db)
    for association in association_db:
        if association["plugin_id"] == plugin_id:
            tempPlugin = faq_repository.get_faq_by_id(association["faq_id"])
            plugin_faqs.append(tempPlugin)
    return {"faqs": plugin_faqs}

# Route to associate a plugin with a faq
@router.post("/{faq_id}/plugins/{plugin_id}/associate/")
def associate_faq_plugin(faq_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginFAQRepository(db)
    updated_faq = association.create_association(faq_id = faq_id, plugin_id = plugin_id)
    return {"message": "Association added successfully"}

# Route to disassociate a plugin from a faq
@router.delete("/{faq_id}/plugins/{plugin_id}/disassociate/")
def disassociate_faq_plugin(faq_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginFAQRepository(db)
    association_db = PluginFAQRepository(db).get_list_dict()
    if {"faq_id": faq_id, "plugin_id": plugin_id} not in association_db:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(faq_id, plugin_id)
    return {"message": "Association removed successfully"}
