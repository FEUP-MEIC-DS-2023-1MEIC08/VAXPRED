from typing import List
from pydantic import BaseModel

class FAQCreate(BaseModel):
    question: str
    answer: str

class FAQUpdate(BaseModel):
    question: str
    answer: str

class FAQResponse(BaseModel):
    id: int
    question: str
    answer: str

class FAQListResponse(BaseModel):
    faqs: List[FAQResponse]
