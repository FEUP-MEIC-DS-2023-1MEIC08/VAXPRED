from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_category import PluginCategoryRepository
from repositories.plugin import PluginRepository
from typing import List, Dict
from schemas.plugin import PluginListResponse

router = APIRouter()

# Route to list plugins associated with a category
@router.get("/{category_id}/plugins/", response_model=PluginListResponse)
def get_category_plugins(category_id: int, db: Session = Depends(get_db)):
    association_db = PluginCategoryRepository(db).get_list_dict()
    category_plugins = []
    plugin_repository = PluginRepository(db)
    for association in association_db:
        if association["category_id"] == category_id:
            tempPlugin = plugin_repository.get_plugin_by_id(association["plugin_id"])
            category_plugins.append(tempPlugin)
    return {"plugins": category_plugins}


# Route to associate a plugin with a category
@router.post("/{category_id}/plugins/{plugin_id}/associate/")
def associate_category_plugin(category_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginCategoryRepository(db)
    updated_category = association.create_association(category_id = category_id, plugin_id = plugin_id)
    return {"message": "Association added successfully"}

# Route to disassociate a plugin from a category
@router.delete("/{category_id}/plugins/{plugin_id}/disassociate/")
def disassociate_category_plugin(category_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginCategoryRepository(db)
    association_db = PluginCategoryRepository(db).get_list_dict()
    if {"category_id": category_id, "plugin_id": plugin_id} not in association_db:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(category_id, plugin_id)
    return {"message": "Association removed successfully"}
