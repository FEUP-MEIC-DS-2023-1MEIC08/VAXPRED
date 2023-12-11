from typing import List
from sqlalchemy.orm import Session
from models import Category

class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_category(self, name: str) -> Category:
        category = Category(
            name=name
        )
        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)
        return category

    def get_category_by_id(self, category_id: int) -> Category:
        return self.db.query(Category).filter(Category.id == category_id).first()

    def get_category_by_name(self, name: str) -> Category:
        return self.db.query(Category).filter(Category.name == name).first()

    def get_all_categories(self) -> List[Category]:
        return self.db.query(Category).all()

    def delete_category_by_id(self, category_id: int) -> None:
        category = self.db.query(Category).filter(Category.id == category_id).first()
        if category is not None:
            self.db.delete(category)
            self.db.commit()

    def update_category(self, category_id: int, name: str) -> Category:
        existing_category = self.db.query(Category).filter(Category.id == category_id).first()

        if existing_category is None:
            return None

        existing_category.name = name

        self.db.commit()
        return existing_category

    def category_exists(self, name: str, exclude_id: int = None) -> bool:
        query = self.db.query(Category).filter(Category.name == name)
        if exclude_id is not None:
            query = query.filter(Category.id != exclude_id)

        return query.first() is not None

