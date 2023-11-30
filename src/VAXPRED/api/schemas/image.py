from typing import List
from pydantic import BaseModel
from datetime import datetime

class ImageCreate(BaseModel):
    path: str

class ImageUpdate(BaseModel):
    path: str

class ImageResponse(BaseModel):
    id: int
    path: str

class ImageListResponse(BaseModel):
    images: List[ImageResponse]
