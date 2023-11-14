from typing import List
from pydantic import BaseModel

class PluginCategory(BaseModel):
    plugin_id: int
    category_id: int

class PluginCategoryList(BaseModel):
    associations: List[PluginCategory]
