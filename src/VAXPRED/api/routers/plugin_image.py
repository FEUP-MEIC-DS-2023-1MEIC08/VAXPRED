from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin_image import PluginImageRepository
from repositories.plugin import PluginRepository
from repositories.image import ImageRepository
from schemas.plugin import PluginListResponse
from schemas.image import ImageListResponse

router = APIRouter()

# Route to list plugins associated with a image
@router.get("/{image_id}/plugins/", response_model=PluginListResponse)
def get_image_plugins(image_id: int, db: Session = Depends(get_db)):
    association_db = PluginImageRepository(db).get_list_dict()
    image_plugins = []
    plugin_repository = PluginRepository(db)
    for association in association_db:
        if association["image_id"] == image_id:
            tempPlugin = plugin_repository.get_plugin_by_id(association["plugin_id"])
            image_plugins.append(tempPlugin)
    return {"plugins": image_plugins}

# Route to list of images associated with a plugin
@router.get("/{plugin_id}/", response_model=ImageListResponse)
def get_plugin_images(plugin_id: int, db: Session = Depends(get_db)):
    association_db = PluginImageRepository(db).get_list_dict()
    plugin_images = []
    image_repository = ImageRepository(db)
    for association in association_db:
        if association["plugin_id"] == plugin_id:
            tempPlugin = image_repository.get_image_by_id(association["image_id"])
            plugin_images.append(tempPlugin)
    return {"images": plugin_images}


# Route to associate a plugin with a image
@router.post("/{image_id}/plugins/{plugin_id}/associate/")
def associate_image_plugin(image_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginImageRepository(db)
    association.create_association(image_id = image_id, plugin_id = plugin_id)
    return {"message": "Association added successfully"}

# Route to disassociate a plugin from a image
@router.delete("/{image_id}/plugins/{plugin_id}/disassociate/")
def disassociate_image_plugin(image_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = PluginImageRepository(db)
    association_db = PluginImageRepository(db).get_list_dict()
    if {"image_id": image_id, "plugin_id": plugin_id} not in association_db:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(plugin_id, image_id)
    return {"message": "Association removed successfully"}
