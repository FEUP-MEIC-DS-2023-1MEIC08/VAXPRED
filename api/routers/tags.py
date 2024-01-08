from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.tag import TagRepository
from schemas.tag import TagCreate, TagUpdate, TagResponse, TagListResponse

router = APIRouter()


# Route to list every tag
@router.get("/", response_model=TagListResponse)
def get_tags(db: Session = Depends(get_db)):
    tag_repository = TagRepository(db)
    tags = tag_repository.get_all_tags()
    return {"tags": tags}


# Route for creating a specific tag
@router.post("/", response_model=TagResponse)
def create_tag(tag: TagCreate, db: Session = Depends(get_db)):
    tag_repository = TagRepository(db)

    existing_tag = tag_repository.get_tag_by_name(tag.name)
    if existing_tag:
        raise HTTPException(status_code=409, detail="Tag with this name already exists")

    new_tag = tag_repository.create_tag(
      name=tag.name
    )
    return new_tag


# Route for updating a specific tag
@router.put("/{tag_id}", response_model=TagResponse)
def update_tag(tag_id: int, tag_update: TagUpdate, db: Session = Depends(get_db)):
    tag_repository = TagRepository(db)
    existing_tag = tag_repository.get_tag_by_name(tag_update.name)
    if existing_tag:
        raise HTTPException(status_code=409, detail="Tag with this name already exists")

    updated_tag = tag_repository.update_tag(
      tag_id,
      name=tag_update.name,
    )

    if updated_tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")

    return updated_tag
