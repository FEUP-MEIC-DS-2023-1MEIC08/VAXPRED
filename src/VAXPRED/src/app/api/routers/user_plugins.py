from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.user_plugin import UserPluginRepository
from typing import List, Dict

router = APIRouter()

# Route to list plugins associated with a user
@router.get("/{user_id}/plugins/", response_model=List[Dict[str, int]])
def get_user_plugins(user_id: int, db: Session = Depends(get_db)):
    association_db = UserPluginRepository(db).get_list_dict()
    user_plugins = [{"plugin_id": association["plugin_id"]} for association in association_db if association["user_id"] == user_id]
    return user_plugins


# Route to associate a plugin with a user
@router.post("/{user_id}/plugins/{plugin_id}/associate/")
def associate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = UserPluginRepository(db)
    updated_user = association.create_association(user_id = user_id, plugin_id = plugin_id)
    return {"message": "Association added successfully"}

# Route to disassociate a plugin from a user
@router.delete("/{user_id}/plugins/{plugin_id}/disassociate/")
def disassociate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = UserPluginRepository(db)
    association_db = UserPluginRepository(db).get_list_dict()
    if {"user_id": user_id, "plugin_id": plugin_id} not in association_db:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(user_id, plugin_id)
    return {"message": "Association removed successfully"}