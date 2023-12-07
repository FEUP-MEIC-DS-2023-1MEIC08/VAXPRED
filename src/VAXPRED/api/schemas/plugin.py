from typing import List, Optional, Dict
from pydantic import BaseModel
from datetime import datetime


class PluginCreate(BaseModel):
    name: str
    version: str
    description: str
    developer: str
    supplier_name: str
    supplier_email: str
    contract_duration: Optional[int]
    price: int
    category: str
    dependencies: List[str]
    faqs: List[Dict[str, str]]


class PluginUpdate(BaseModel):
    name: str
    version: str
    description: str
    developer: str
    supplier_name: str
    supplier_email: str
    contract_duration: Optional[int]
    price: int
    category: str
    dependencies: List[str]
    faqs: List[Dict[str, str]]
    
class PluginResponse(BaseModel):
    id: int
    name: str
    version: str
    description: str
    developer: str
    release_date: datetime
    last_update_date: datetime
    supplier_name: str
    supplier_email: str
    contract_duration: Optional[int]
    price: int
    category: str
    dependencies: List[str]
    tags: List[str]
    faqs: List[Dict[str, str]]
    images: List[str]

class PluginGeralInfo(BaseModel):
    id: int
    name: str
    version: str
    description: str
    developer: str
    release_date: datetime
    last_update_date: datetime
    supplier_name: str
    supplier_email: str
    contract_duration: Optional[int]
    price: int
    category: str

class PluginGeralListResponse(BaseModel):
    plugins: List[PluginGeralInfo]
class PluginListResponse(BaseModel):
    plugins: List[PluginResponse]
