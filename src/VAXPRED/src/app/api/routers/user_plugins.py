from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from typing import List, Dict

router = APIRouter()

# Simulating a list of associations between users and plugins
user_plugin_association_db = [
    {"user_id": 1, "plugin_id": 1},
    {"user_id": 1, "plugin_id": 2},
    {"user_id": 2, "plugin_id": 1},
]

# Route to list plugins associated with a user
@router.get("/users/{user_id}/plugins/", response_model=List[Dict[str, int]])
def get_user_plugins(user_id: int, db: Session = Depends(get_db)):
    user_plugins = [{"plugin_id": association["plugin_id"]} for association in user_plugin_association_db if association["user_id"] == user_id]
    return user_plugins

# Route to associate a plugin with a user
@router.post("/users/{user_id}/plugins/{plugin_id}/associate/")
def associate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    # Check if the association already exists
    if {"user_id": user_id, "plugin_id": plugin_id} in user_plugin_association_db:
        raise HTTPException(status_code=400, detail="Association already exists")

    user_plugin_association_db.append({"user_id": user_id, "plugin_id": plugin_id})
    return {"message": "Association created successfully"}

# Route to disassociate a plugin from a user
@router.delete("/users/{user_id}/plugins/{plugin_id}/disassociate/")
def disassociate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    if {"user_id": user_id, "plugin_id": plugin_id} not in user_plugin_association_db:
        raise HTTPException(status_code=404, detail="Association not found")

    user_plugin_association_db.remove({"user_id": user_id, "plugin_id": plugin_id})
    return {"message": "Association removed successfully"}
