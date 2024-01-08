from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_tag import PluginTagRepository
from repositories.plugin import PluginRepository
from repositories.plugin_dependencies import PluginDependencyRepository
from repositories.plugin_faqs import PluginFaqRepository
from repositories.plugin_image import PluginImageRepository
from schemas.plugin import PluginListResponse, PluginResponse

router = APIRouter()

# Route to list plugins associated with a tag
@router.get("/{tag_id}/plugins/", response_model=PluginListResponse)
def get_tag_plugins(tag_id: int, db: Session = Depends(get_db)):
    plugins = PluginTagRepository(db).get_plugins_by_tag_id(tag_id=tag_id)
    tag_plugins = []
    plugin_repository = PluginRepository(db)
    tag_repository = PluginTagRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)
    plugin_images_repository = PluginImageRepository(db)
    
    for id in plugins:
        plugin = plugin_repository.get_plugin_by_id(id)
        plugin_id = plugin.id
        tags = tag_repository.get_tags_by_plugin_id(plugin_id)
        dependencies = plugin_dependencies_repository.get_dependencies_by_plugin_id(plugin_id)
        faqs = plugin_faqs_repository.get_faqs_by_plugin_id(plugin_id)
        images = plugin_images_repository.get_images_by_plugin_id(plugin_id)

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
            category=plugin.category,
            changelog=plugin.changelog,
            tags=tags,
            dependencies=dependencies,
            faqs=faqs,
            images=images
        )
        tag_plugins.append(response)
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
