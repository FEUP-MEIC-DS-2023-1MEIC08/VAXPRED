from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_categories import PluginCategoryRepository
from repositories.plugin import PluginRepository
from schemas.plugin import PluginListResponse, PluginResponse
from repositories.plugin_dependencies import PluginDependencyRepository
from repositories.plugin_faqs import PluginFaqRepository
from repositories.plugin_tag import PluginTagRepository


router = APIRouter()


# Route to list plugins associated with a category
@router.get("/{category_id}/plugins/", response_model=PluginListResponse)
def get_category_plugins(category_id: int, db: Session = Depends(get_db)):
    plugins = PluginCategoryRepository(db).get_plugins_by_category_id(category_id)
    category_plugins = []
    plugin_repository = PluginRepository(db)
    category_repository = PluginCategoryRepository(db)
    tag_repository = PluginTagRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)        

    for plugin_id in plugins:
        plugin = plugin_repository.get_plugin_by_id(plugin_id)
        categories = category_repository.get_categories_by_plugin_id(plugin_id)
        tags = tag_repository.get_tags_by_plugin_id(plugin_id)
        dependencies = plugin_dependencies_repository.get_dependency_names_by_plugin_id(plugin_id)
        faqs = plugin_faqs_repository.get_faqs_by_plugin_id(plugin_id)
        response = PluginResponse(
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
            categories=categories,
            tags=tags,
            dependencies=dependencies,
            faqs=faqs
        )
        category_plugins.append(response)

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
