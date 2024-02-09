from typing import List
from pydantic import BaseModel

class TagCreate(BaseModel):
    name: str

class TagUpdate(BaseModel):
    name: str

class TagResponse(BaseModel):
    id: int
    name: str

class TagListResponse(BaseModel):
    tags: List[TagResponse]
