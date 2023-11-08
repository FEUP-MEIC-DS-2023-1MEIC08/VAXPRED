from typing import List
from pydantic import BaseModel
from datetime import datetime

class PluginCreate(BaseModel):
    name: str
    version: str
    description : str
    developer : str
    supplier_name : str
    supplier_email : str

class PluginUpdate(BaseModel):
    name: str
    version: str
    description : str
    developer : str
    supplier_name : str
    supplier_email : str

class PluginResponse(BaseModel):
    id: int
    name: str
    version: str
    description : str
    developer : str
    release_date : datetime
    last_update_date : datetime
    supplier_name : str
    supplier_email : str

class PluginListResponse(BaseModel):
    plugins: List[PluginResponse]
