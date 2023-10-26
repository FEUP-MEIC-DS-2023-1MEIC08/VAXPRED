from typing import List
from pydantic import BaseModel
from datetime import datetime

class PluginCreate(BaseModel):
    name: str
    version: str
    description : str
    developer : str

class PluginUpdate(BaseModel):
  name: str
  version: str
  description : str
  developer : str

class PluginResponse(BaseModel):
    id: int
    name: str
    version: str
    description : str
    developer : str
    release_date : datetime
    last_update_date : datetime

class PluginListResponse(BaseModel):
    plugins: List[PluginResponse]
