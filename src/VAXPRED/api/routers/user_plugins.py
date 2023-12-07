from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_dependencies import PluginDependencyRepository
from repositories.plugin_faqs import PluginFaqRepository
from repositories.plugin_tag import PluginTagRepository
from repositories.user_plugin import UserPluginRepository
from repositories.plugin import PluginRepository
from repositories.plugin_image import PluginImageRepository

from schemas.plugin import PluginResponse


router = APIRouter()


# Route to list plugins associated with a user
@router.get("/{user_id}/plugins/")
def get_user_plugins(user_id: int, db: Session = Depends(get_db)):
    associations = UserPluginRepository(db).get_user_plugin_associations(user_id=user_id)
    tags = PluginTagRepository(db)
    dependencies = PluginDependencyRepository(db)
    faqs = PluginFaqRepository(db)

    if not associations:
        raise HTTPException(status_code=404, detail="No plugins found for the user")
    plugin_repository = PluginRepository(db)
    user_plugins = []
    for association in associations:
        plugin_id = association["plugin_id"]
        temp_plugin = plugin_repository.get_plugin_by_id(plugin_id)
        
        plugin_repository = PluginRepository(db)
        tag_repository = PluginTagRepository(db)
        plugin_dependencies_repository = PluginDependencyRepository(db)
        plugin_faqs_repository = PluginFaqRepository(db)
        plugin_images_repository = PluginImageRepository(db)

        plugin = plugin_repository.get_plugin_by_id(plugin_id)
        tags = tag_repository.get_tags_by_plugin_id(plugin_id)
        dependencies = plugin_dependencies_repository.get_dependency_names_by_plugin_id(plugin_id)
        faqs = plugin_faqs_repository.get_faqs_by_plugin_id(plugin_id)
        images = plugin_images_repository.get_images_by_plugin_id(plugin_id)

        if plugin is None:
            raise HTTPException(status_code=404, detail="Plugin not found")

        plugin = PluginResponse(
            id=plugin.id,
            name=plugin.name,
            version=plugin.version,
            description=plugin.description,
            developer=plugin.developer,
            release_date=plugin.release_date,
            last_update_date=plugin.last_update_date,
            supplier_name=plugin.supplier_name,
            supplier_email=plugin.supplier_email,
            contract_duration=plugin.contract_duration,
            price=plugin.price,
            category=plugin.category,
            tags=tags,
            dependencies=dependencies,
            faqs=faqs,
            images=images
        )
        user_plugins.append(plugin)
        
    return {"associations": user_plugins}


# Route to associate a plugin with a user
@router.post("/{user_id}/plugins/{plugin_id}/associate/")
def associate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = UserPluginRepository(db)
    plugin = PluginRepository(db)

    specific_association = association.get_specific_user_plugin_associations(user_id, plugin_id)

    if specific_association:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Association already exists")

    plugin_duration = plugin.get_plugin_duration_by_id(plugin_id=plugin_id)
    if plugin_duration is None:
        association.create_association(user_id=user_id, plugin_id=plugin_id)
    else:
        association.create_association(user_id=user_id, plugin_id=plugin_id, duration=plugin_duration)

    return {"message": "Association added successfully"}


# Route to disassociate a plugin from a user
@router.delete("/{user_id}/plugins/{plugin_id}/disassociate/")
def disassociate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = UserPluginRepository(db)
    specific_association = association.get_specific_user_plugin_associations(user_id, plugin_id)

    if not specific_association:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(user_id, plugin_id)
    return {"message": "Association removed successfully"}
