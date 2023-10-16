from typing import List
from pydantic import BaseModel

class PluginCreate(BaseModel):
    name: str
    version: str

class PluginUpdate(BaseModel):
    name:str
    version: str

class PluginResponse(BaseModel):
    id: int
    name: str
    version: str

class PluginListResponse(BaseModel):
    plugins: List[PluginResponse]
