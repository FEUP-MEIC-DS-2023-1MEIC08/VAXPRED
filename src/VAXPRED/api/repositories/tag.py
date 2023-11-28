from typing import List
from sqlalchemy.orm import Session
from models import Tag
from datetime import datetime
import pytz

class TagRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_tag(self, name: str) -> Tag:
        tag = Tag(
            name=name
        )
        self.db.add(tag)
        self.db.commit()
        self.db.refresh(tag)
        return tag

    def get_tag_by_id(self, tag_id: int) -> Tag:
        return self.db.query(Tag).filter(Tag.id == tag_id).first()

    def get_tag_by_name(self, name: str) -> Tag:
        return self.db.query(Tag).filter(Tag.name == name).first()

    def get_all_tags(self) -> List[Tag]:
        return self.db.query(Tag).all()

    def delete_tag_by_id(self, tag_id : int) -> None:
      tag = self.db.query(Tag).filter(Tag.id == tag_id).first()
      if tag is not None:
        self.db.delete(tag)
        self.db.commit()

    def update_tag(self, tag_id: int, name: str) -> Tag:
      existing_tag = self.db.query(Tag).filter(Tag.id == tag_id).first()

      if existing_tag is None:
        return None

      existing_tag.name = name

      self.db.commit()
      return existing_tag

