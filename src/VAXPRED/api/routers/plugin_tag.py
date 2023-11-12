from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_tag import PluginTagRepository
from repositories.plugin import PluginRepository
from typing import List, Dict
from schemas.plugin import PluginListResponse

router = APIRouter()

# Route to list plugins associated with a tag
@router.get("/{tag_id}/plugins/", response_model=PluginListResponse)
def get_tag_plugins(tag_id: int, db: Session = Depends(get_db)):
    association_db = PluginTagRepository(db).get_list_dict()
    tag_plugins = []
    plugin_repository = PluginRepository(db)
    for association in association_db:
        if association["tag_id"] == tag_id:
            tempPlugin = plugin_repository.get_plugin_by_id(association["plugin_id"])
            tag_plugins.append(tempPlugin)
    return {"plugins": tag_plugins}


# Route to associate a plugin with a tag
@router.post("/{tag_id}/plugins/{plugin_id}/associate/")
def associate_tag_plugin(tag_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginTagRepository(db)
    updated_tag = association.create_association(tag_id = tag_id, plugin_id = plugin_id)
    return {"message": "Association added successfully"}

# Route to disassociate a plugin from a tag
@router.delete("/{tag_id}/plugins/{plugin_id}/disassociate/")
def disassociate_tag_plugin(tag_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginTagRepository(db)
    association_db = PluginTagRepository(db).get_list_dict()
    if {"tag_id": tag_id, "plugin_id": plugin_id} not in association_db:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(tag_id, plugin_id)
    return {"message": "Association removed successfully"}
