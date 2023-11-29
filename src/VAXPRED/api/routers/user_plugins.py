from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_dependencies import PluginDependencyRepository
from repositories.plugin_faqs import PluginFaqRepository
from repositories.plugin_tag import PluginTagRepository
from repositories.user_plugin import UserPluginRepository
from repositories.plugin import PluginRepository
from repositories.plugin_categories import PluginCategoryRepository

from schemas.user_plugin import PluginWithCategories

router = APIRouter()


# Route to list plugins associated with a user
@router.get("/{user_id}/plugins/")
def get_user_plugins(user_id: int, db: Session = Depends(get_db)):
    associations = UserPluginRepository(db).get_user_plugin_associations(user_id=user_id)
    categories = PluginCategoryRepository(db)
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
        plugin_categories = categories.get_categories_by_plugin_id(plugin_id)
        plugin_tags = tags.get_tags_by_plugin_id(plugin_id)
        plugin_dependencies = dependencies.get_dependency_names_by_plugin_id(plugin_id)
        plugin_faqs = faqs.get_faqs_by_plugin_id(plugin_id)

        user_plugin = PluginWithCategories(
            name=temp_plugin.name,
            version=temp_plugin.version,
            description=temp_plugin.description,
            developer=temp_plugin.developer,
            release_date=temp_plugin.release_date,
            last_update_date=temp_plugin.last_update_date,
            supplier_name=temp_plugin.supplier_name,
            supplier_email=temp_plugin.supplier_email,
            contract_duration=temp_plugin.contract_duration,
            price=temp_plugin.price,
            type=temp_plugin.type,
            plugin_id=temp_plugin.id,
            association_date=association["association_date"],
            duration=association["duration"],
            categories=plugin_categories,
            tags=plugin_tags,
            dependencies=plugin_dependencies,
            faqs=plugin_faqs
        )

        user_plugins.append(user_plugin)
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
