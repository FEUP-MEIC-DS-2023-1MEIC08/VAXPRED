from fastapi import APIRouter, HTTPException, Depends, params
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin import PluginRepository
from repositories.plugin_dependencies import PluginDependencyRepository
from repositories.plugin_faqs import PluginFaqRepository
from repositories.plugin_tag import PluginTagRepository
from repositories.plugin_image import PluginImageRepository
from schemas.plugin import PluginCreate, PluginUpdate, PluginResponse, \
    PluginGeralInfo, PluginListResponse

router = APIRouter()


# Route to list every plugin
@router.get("/", response_model=PluginListResponse)
def get_plugins(search: str = params.Query(None), db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    if search:
        plugins = plugin_repository.get_all_plugins_search(search)
    else:
        plugins = plugin_repository.get_all_plugins()

    if plugins is None:
        raise HTTPException(status_code=404, detail="No plugins available")
    
    tag_repository = PluginTagRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)
    plugin_images_repository = PluginImageRepository(db)

    pluginsResponse = []
    for plugin in plugins:
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
        pluginsResponse.append(response)

    return {"plugins": pluginsResponse}


# Route for display a specific plugin
@router.get("/{plugin_id}", response_model=PluginResponse)
def get_plugin(plugin_id: int, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    tag_repository = PluginTagRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)
    plugin_images_repository = PluginImageRepository(db)

    plugin = plugin_repository.get_plugin_by_id(plugin_id)
    tags = tag_repository.get_tags_by_plugin_id(plugin_id)
    dependencies = plugin_dependencies_repository.get_dependencies_by_plugin_id(plugin_id)
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
        changelog=plugin.changelog,
        tags=tags,
        dependencies=dependencies,
        faqs=faqs,
        images=images
    )

    return plugin

# Route to list every plugin with a specific category
@router.get("/category/{category}", response_model=PluginListResponse)
def get_plugins_by_category(category: str, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)

    if (category == "data-quality"): 
        category_name = "Data Quality"
    elif (category == "data-curation"): 
        category_name = "Data Curation"
    elif (category == "synthetic-data-generation"): 
        category_name = "Synthetic Data Generation"
    else: 
        raise HTTPException(status_code=404, detail="Unavailable Category")

    plugins = plugin_repository.get_all_plugins_by_category(category_name)

    if plugins is None:
        raise HTTPException(status_code=404, detail="No plugins available")
    
    tag_repository = PluginTagRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)
    plugin_images_repository = PluginImageRepository(db)

    pluginsResponse = []
    for plugin in plugins:
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
        pluginsResponse.append(response)

    return {"plugins": pluginsResponse}


# Route for create a specific plugin
@router.post("/")
def create_plugin(plugin: PluginCreate, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)

    tempDepend = []
    for dependency in plugin.dependencies:
        if dependency[0] in tempDepend:
            raise HTTPException(status_code=409, detail="Plugin with this name already exists")
        else:
            tempDepend.append(dependency[0])

    existing_plugin = plugin_repository.get_plugin_by_name(plugin.name)
    if existing_plugin:
        raise HTTPException(status_code=409, detail="Plugin with this name already exists")
    
    new_plugin = plugin_repository.create_plugin(
        name=plugin.name,
        version=plugin.version,
        description=plugin.description,
        developer=plugin.developer,
        supplier_name=plugin.supplier_name,
        supplier_email=plugin.supplier_email,
        contract_duration=plugin.contract_duration,
        price=plugin.price,
        category=plugin.category,
        changelog=plugin.changelog
    )

    dependencies = plugin.dependencies
    for dependency in dependencies:
        plugin_dependencies_repository.create_dependency(plugin_id=new_plugin.id, dependency_name=dependency[0],dependency_vendor=dependency[1],dependency_version=dependency[2])

    faqs = plugin.faqs
    plugin_faqs_repository.create_faqs(plugin_id=new_plugin.id, faqs=faqs)

    return {"id": new_plugin.id, "detail": "Plugin created successfully!"}


# Route for update a specific plugin
@router.put("/{plugin_id}", response_model=PluginGeralInfo)
def update_plugin(plugin_id: int, plugin_update: PluginUpdate, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)

    updated_plugin = plugin_repository.update_plugin(
        plugin_id,
        name=plugin_update.name,
        version=plugin_update.version,
        description=plugin_update.description,
        developer=plugin_update.developer,
        supplier_name=plugin_update.supplier_name,
        supplier_email=plugin_update.supplier_email,
        contract_duration=plugin_update.contract_duration,
        price=plugin_update.price,
        category=plugin_update.category,
        changelog=plugin_update.changelog
    )

    if updated_plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")

    plugin_dependencies_repository.update_dependencies(plugin_id=plugin_id, new_dependencies=plugin_update.dependencies)
    plugin_faqs_repository.update_faqs(plugin_id=plugin_id, new_faqs=plugin_update.faqs)

    return updated_plugin


# Route to delete a plugin
@router.delete("/{plugin_id}")
def delete_plugin(plugin_id: int, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)

    existing_plugin = plugin_repository.get_plugin_by_id(plugin_id)
    if existing_plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")

    deleted = plugin_repository.delete_plugin(plugin_id)

    if deleted:
        return {"message": "Plugin deleted successfully"}
    else:
        return {"message": "Failed to delete plugin"}
