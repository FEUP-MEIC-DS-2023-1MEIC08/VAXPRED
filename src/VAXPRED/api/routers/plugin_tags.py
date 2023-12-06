from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_tag import PluginTagRepository
from repositories.plugin import PluginRepository
from schemas.plugin import PluginListResponse

router = APIRouter()

# Route to list plugins associated with a tag
@router.get("/{tag_id}/plugins/", response_model=PluginListResponse)
def get_tag_plugins(tag_id: int, db: Session = Depends(get_db)):
    plugins = PluginTagRepository(db).get_plugins_by_tag_id(tag_id=tag_id)
    tag_plugins = []
    plugin_repository = PluginRepository(db)
    for plugin in plugins:
        tempPlugin = plugin_repository.get_plugin_by_id(plugin)
        tag_plugins.append(tempPlugin)
    return {"plugins": tag_plugins}


# Route to associate a plugin with a tag
@router.post("/{tag_id}/plugins/{plugin_id}/associate/")
def associate_tag_plugin(tag_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginTagRepository(db)
    specific_association = association.get_specific_tag_plugin_associations(tag_id=tag_id, plugin_id=plugin_id)
    if specific_association:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Association already exists")

    association.create_association(plugin_id=plugin_id, tag_id=tag_id)
    return {"message": "Association added successfully"}


# Route to disassociate a plugin from a tag
@router.delete("/{tag_id}/plugins/{plugin_id}/disassociate/")
def disassociate_tag_plugin(tag_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginTagRepository(db)
    specific_association = association.get_specific_tag_plugin_associations(tag_id=tag_id, plugin_id=plugin_id)

    if not specific_association:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(plugin_id=plugin_id, tag_id=tag_id)
    return {"message": "Association removed successfully"}
