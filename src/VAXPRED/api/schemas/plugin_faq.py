from typing import List
from pydantic import BaseModel

class PluginFAQ(BaseModel):
    plugin_id: int
    faq_id: int

class PluginFAQList(BaseModel):
    associations: List[PluginFAQ]
