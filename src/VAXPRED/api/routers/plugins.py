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

    new_plugin = plugin_repository.create_plugin(
      name=plugin.name,
      version=plugin.version,
      description=plugin.description,
      developer = plugin.developer
    )
    return new_plugin


# Route for update a specific plugin
@router.put("/{plugin_id}", response_model=PluginResponse)
def update_plugin(plugin_id: int, plugin_update: PluginUpdate, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)

    updated_plugin = plugin_repository.update_plugin(
      plugin_id,
      name = plugin_update.name,
      version = plugin_update.version,
      description = plugin_update.description,
      developer = plugin_update.developer
    )

    if updated_plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")

    return updated_plugin

# Route to delete a plugin
@router.delete("/{plugin_id}", response_model=PluginResponse)
def delete_plugin(plugin_id: int, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    deleted_plugin = plugin_repository.delete_plugin(plugin_id)
    if deleted_plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")
    return deleted_plugin
