from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_categories import PluginCategoryRepository
from repositories.plugin import PluginRepository
from schemas.plugin import PluginListResponse

router = APIRouter()


# Route to list plugins associated with a category
@router.get("/{category_id}/plugins/", response_model=PluginListResponse)
def get_category_plugins(category_id: int, db: Session = Depends(get_db)):
    plugins = PluginCategoryRepository(db).get_plugins_by_category_id(category_id)
    category_plugins = []
    plugin_repository = PluginRepository(db)
    for plugin in plugins:
        tempPlugin = plugin_repository.get_plugin_by_id(plugin)
        category_plugins.append(tempPlugin)
    return {"plugins": category_plugins}


# Route to associate a plugin with a category
@router.post("/{category_id}/plugins/{plugin_id}/associate/")
def associate_category_plugin(category_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginCategoryRepository(db)
    specific_association = association.get_specific_category_plugin_associations(category_id, plugin_id)
    if specific_association:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Association already exists")

    association.create_association(plugin_id=plugin_id, category_id=category_id)
    return {"message": "Association added successfully"}


# Route to disassociate a plugin from a category
@router.delete("/{category_id}/plugins/{plugin_id}/disassociate/")
def disassociate_category_plugin(category_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginCategoryRepository(db)
    specific_association = association.get_specific_category_plugin_associations(category_id, plugin_id)

    if not specific_association:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(plugin_id=plugin_id, category_id=category_id)
    return {"message": "Association removed successfully"}
