from typing import List
from pydantic import BaseModel

class PluginTag(BaseModel):
    plugin_id: int
    tag_id: int

class PluginTagList(BaseModel):
    associations: List[PluginTag]
