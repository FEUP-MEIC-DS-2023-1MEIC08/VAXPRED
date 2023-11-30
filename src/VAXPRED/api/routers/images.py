from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.image import ImageRepository
from schemas.image import ImageCreate, ImageUpdate, ImageResponse, ImageListResponse

router = APIRouter()


# Route to list every image
@router.get("/", response_model=ImageListResponse)
def get_images(db: Session = Depends(get_db)):
    image_repository = ImageRepository(db)
    images = image_repository.get_all_images()
    return {"images": images}


# Route for displaying a specific image
@router.get("/{image_id}", response_model=ImageResponse)
def get_image(image_id: int, db: Session = Depends(get_db)):
    image_repository = ImageRepository(db)
    image = image_repository.get_image_by_id(image_id)

    if image is None:
        raise HTTPException(status_code=404, detail="Image not found")
    return image


# Route for creating a specific image
@router.post("/", response_model=ImageResponse)
def create_image(image: ImageCreate, db: Session = Depends(get_db)):
    image_repository = ImageRepository(db)

    existing_image = image_repository.get_image_by_path(image.path)
    if existing_image:
        raise HTTPException(status_code=400, detail="Image with this path already exists")

    new_image = image_repository.create_image(
      path= image.path
    )
    return new_image


# Route for updating a specific image
@router.put("/{image_id}", response_model=ImageResponse)
def update_image(image_id: int, image_update: ImageUpdate, db: Session = Depends(get_db)):
    image_repository = ImageRepository(db)

    updated_image = image_repository.update_image(
      image_id,
      path = image_update.path,
    )

    if updated_image is None:
        raise HTTPException(status_code=404, detail="Image not found")

    return updated_image
