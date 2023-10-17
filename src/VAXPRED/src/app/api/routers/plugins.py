from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin import PluginRepository
from schemas.plugin import PluginCreate, PluginUpdate, PluginResponse, PluginListResponse

router = APIRouter()


# Route to list every plugin

@router.get("/", response_model=PluginListResponse)
def get_plugins(db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    plugins = plugin_repository.get_all_plugins()
    return {"plugins": plugins}


# Route for display a specific plugin
@router.get("/{plugin_id}", response_model=PluginResponse)
def get_plugin(plugin_id: int, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    plugin = plugin_repository.get_plugin_by_id(plugin_id)

    if plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")
    return plugin


# Route for create a specific plugin
@router.post("/", response_model=PluginResponse)
def create_plugin(plugin: PluginCreate, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)

    existing_plugin = plugin_repository.get_plugin_by_name(plugin.name)
    if existing_plugin:
        raise HTTPException(status_code=400, detail="Plugin with this name already exists")

    new_plugin = plugin_repository.create_plugin(name=plugin.name, version=plugin.version)
    return new_plugin


# Route for update a specific plugin
@router.put("/{plugin_id}", response_model=PluginResponse)
def update_plugin(plugin_id: int, plugin_update: PluginUpdate, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)

    existing_plugin = plugin_repository.get_plugin_by_id(plugin_id)
    if existing_plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")

    existing_plugin.name = plugin_update.name
    existing_plugin.version = plugin_update.version

    return existing_plugin
