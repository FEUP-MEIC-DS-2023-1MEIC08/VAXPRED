from collections import Counter

from fastapi import APIRouter, HTTPException, Depends, params
from sqlalchemy.orm import Session
from database import get_db
from repositories.plugin import PluginRepository
from repositories.plugin_categories import PluginCategoryRepository
from repositories.plugin_dependencies import PluginDependencyRepository
from repositories.plugin_faqs import PluginFaqRepository
from repositories.plugin_tag import PluginTagRepository
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
    
    category_repository = PluginCategoryRepository(db)
    tag_repository = PluginTagRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)

    pluginsResponse = []
    for plugin in plugins:
        plugin_id = plugin.id
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
            type=plugin.type,
            categories=categories,
            tags=tags,
            dependencies=dependencies,
            faqs=faqs
        )
        pluginsResponse.append(response)


    return {"plugins": pluginsResponse}


# Route for display a specific plugin
@router.get("/{plugin_id}", response_model=PluginResponse)
def get_plugin(plugin_id: int, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    category_repository = PluginCategoryRepository(db)
    tag_repository = PluginTagRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)

    plugin = plugin_repository.get_plugin_by_id(plugin_id)
    categories = category_repository.get_categories_by_plugin_id(plugin_id)
    tags = tag_repository.get_tags_by_plugin_id(plugin_id)
    dependencies = plugin_dependencies_repository.get_dependency_names_by_plugin_id(plugin_id)
    faqs = plugin_faqs_repository.get_faqs_by_plugin_id(plugin_id)

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
        type=plugin.type,
        categories=categories,
        tags=tags,
        dependencies=dependencies,
        faqs=faqs
    )

    return plugin


# Route for create a specific plugin
@router.post("/")
def create_plugin(plugin: PluginCreate, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)

    if any(count > 1 for count in Counter(plugin.dependencies).values()):
        raise HTTPException(status_code=422, detail="Duplicate dependencies are not allowed")

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
        type=plugin.type
    )

    dependencies = plugin.dependencies
    for dependency in dependencies:
        plugin_dependencies_repository.create_dependency(plugin_id=new_plugin.id, dependency_name=dependency)

    faqs = plugin.faqs
    plugin_faqs_repository.create_faqs(plugin_id=new_plugin.id, faqs=faqs)

    return new_plugin


# Route for update a specific plugin
@router.put("/{plugin_id}", response_model=PluginGeralInfo)
def update_plugin(plugin_id: int, plugin_update: PluginUpdate, db: Session = Depends(get_db)):
    plugin_repository = PluginRepository(db)
    plugin_dependencies_repository = PluginDependencyRepository(db)
    plugin_faqs_repository = PluginFaqRepository(db)

    unique_dependencies = list(set(plugin_update.dependencies))

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
        type=plugin_update.type
    )

    if updated_plugin is None:
        raise HTTPException(status_code=404, detail="Plugin not found")

    plugin_dependencies_repository.update_dependencies(plugin_id=plugin_id, new_dependencies=unique_dependencies)
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
        return {"message": f"Plugin deleted successfully"}
    else:
        return {"message": f"Failed to delete plugin"}
