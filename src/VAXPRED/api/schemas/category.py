from typing import List
from pydantic import BaseModel
from datetime import datetime

class CategoryCreate(BaseModel):
    name: str

class CategoryUpdate(BaseModel):
    name: str

class CategoryResponse(BaseModel):
    id: int
    name: str

class CategoryListResponse(BaseModel):
    categories: List[CategoryResponse]
