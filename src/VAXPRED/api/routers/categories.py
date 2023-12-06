from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.category import CategoryRepository
from schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse, CategoryListResponse

router = APIRouter()


# Route to list every category
@router.get("/", response_model=CategoryListResponse)
def get_categories(db: Session = Depends(get_db)):
    category_repository = CategoryRepository(db)
    categories = category_repository.get_all_categories()
    return {"categories": categories}


# Route for creating a specific category
@router.post("/", response_model=CategoryResponse)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    category_repository = CategoryRepository(db)

    existing_category = category_repository.get_category_by_name(category.name)
    if existing_category:
        raise HTTPException(status_code=409, detail="Category with this name already exists")

    new_category = category_repository.create_category(
      name=category.name
    )
    return new_category


# Route for updating a specific category
@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(category_id: int, category_update: CategoryUpdate, db: Session = Depends(get_db)):
    category_repository = CategoryRepository(db)
    exists = category_repository.category_exists(category_update.name)

    if exists:
        raise HTTPException(status_code=409, detail="This category name already exists")

    updated_category = category_repository.update_category(
      category_id,
      name=category_update.name,
    )

    if updated_category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    return updated_category
