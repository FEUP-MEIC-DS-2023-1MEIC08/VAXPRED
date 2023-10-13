from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Plugin(BaseModel):
    id: int
    name: str
    version: str

# Fake db 
plugins_db = [
    Plugin(id=1, name="plugin1", version="1.0.0"),
    Plugin(id=2, name="plugin2", version="2.0.0"),
]

# Route to list every plugins
@router.get("/", response_model=List[Plugin])
def get_plugins():
    return plugins_db

# Route for display a specific plugin
@router.get("/{plugin_id}", response_model=Plugin)
def get_plugin(plugin_id: int):
    for plugin in plugins_db:
        if plugin.id == plugin_id:
            return plugin
    if plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")
    return plugin

