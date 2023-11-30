from typing import List
from sqlalchemy.orm import Session
from models import Image

class ImageRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_image(self, path: str) -> Image:
        image = Image(
            path = path
        )
        self.db.add(image)
        self.db.commit()
        self.db.refresh(image)
        return image

    def get_image_by_id(self, image_id: int) -> Image:
        return self.db.query(Image).filter(Image.id == image_id).first()

    def get_image_by_path(self, path: str) -> Image:
        return self.db.query(Image).filter(Image.path == path).first()

    def get_all_images(self) -> List[Image]:
        return self.db.query(Image).all()

    def delete_image_by_id(self, image_id : int) -> None:
      image = self.db.query(Image).filter(Image.id == image_id).first()
      if image is not None:
        self.db.delete(image)
        self.db.commit()

    def update_image(self, image_id: int, path: str) -> Image:
      existing_image = self.db.query(Image).filter(Image.id == image_id).first()

      if existing_image is None:
        return None

      existing_image.path = path

      self.db.commit()
      return existing_image

