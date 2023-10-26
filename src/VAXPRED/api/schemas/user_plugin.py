from typing import List
from pydantic import BaseModel

class UserPlugin(BaseModel):
    user_id: int
    plugin_id: int

class UserPluginList(BaseModel):
    associations: List[UserPlugin]
