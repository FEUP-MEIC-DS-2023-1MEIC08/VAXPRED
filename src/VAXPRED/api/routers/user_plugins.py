from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.user_plugin import UserPluginRepository
from repositories.plugin import PluginRepository
from typing import List, Dict
from schemas.user_plugin import UserPlugin, UserPluginList
from fastapi.responses import JSONResponse

router = APIRouter()

# Route to list plugins associated with a user
@router.get("/{user_id}/plugins/", response_model=UserPluginList)
def get_user_plugins(user_id: int, db: Session = Depends(get_db)):
    association_db = UserPluginRepository(db).get_list_dict()  #Ver melhor
    user_plugins = []
    plugin_repository = PluginRepository(db)
    for association in association_db:
        if association["user_id"] == user_id:
            temp_plugin = plugin_repository.get_plugin_by_id(association["plugin_id"])

            user_plugin = UserPlugin(
                name=temp_plugin.name,
                version=temp_plugin.version,
                description=temp_plugin.description,
                developer=temp_plugin.developer,
                release_date=temp_plugin.release_date,
                last_update_date=temp_plugin.last_update_date,
                supplier_name=temp_plugin.supplier_name,
                supplier_email=temp_plugin.supplier_email,
                plugin_id=temp_plugin.id,
                association_date=association["association_date"],
                duration=association["duration"]
            )

            user_plugins.append(user_plugin)
    return {"associations": user_plugins}  # Change 'plugins' to 'associations'



# Route to associate a plugin with a user
@router.post("/{user_id}/plugins/{plugin_id}/associate/")
def associate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = UserPluginRepository(db)
    plugin = PluginRepository(db)
    try:
        plugin_duration = plugin.get_plugin_duration_by_id(plugin_id=plugin_id)
        if plugin_duration is None:
            updated_user = association.create_association(user_id=user_id, plugin_id=plugin_id)
        else:
            print("Ya")
            updated_user = association.create_association(user_id=user_id, plugin_id=plugin_id, duration=plugin_duration)

        return {"message": "Association added successfully"}

    except HTTPException as http_exception:
        # Handle specific HTTP exceptions
        return JSONResponse(content={"error": http_exception.detail}, status_code=http_exception.status_code)

    except Exception as generic_exception:
        # Handle generic exceptions
        print(f"Exception: {generic_exception}")
        return JSONResponse(content={"error": "Internal Server Error"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Route to disassociate a plugin from a user
@router.delete("/{user_id}/plugins/{plugin_id}/disassociate/")
def disassociate_user_plugin(user_id: int, plugin_id: int, db: Session = Depends(get_db)):
    association = UserPluginRepository(db)
    association_db = UserPluginRepository(db).get_list_dict()
    print(association_db)
    found = False
    for associ in association_db:
        if (associ['user_id'] == user_id and associ['plugin_id'] == plugin_id):
            found = True
            break
    if not found:
        raise HTTPException(status_code=404, detail="Association not found")

    association.delete_association(user_id, plugin_id)
    return {"message": "Association removed successfully"}
