from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories.faq import FAQRepository
from schemas.faq import FAQCreate, FAQUpdate, FAQResponse, FAQListResponse

router = APIRouter()


# Route to list every FAQ
@router.get("/", response_model=FAQListResponse)
def get_faqs(db: Session = Depends(get_db)):
    faq_repository = FAQRepository(db)
    faqs = faq_repository.get_all_faqs()
    return {"faqs": faqs}


# Route for displaying a specific FAQ
@router.get("/{faq_id}", response_model=FAQResponse)
def get_faq(faq_id: int, db: Session = Depends(get_db)):
    faq_repository = FAQRepository(db)
    faq = faq_repository.get_faq_by_id(faq_id)

    if faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq


# Route for creating a specific faq
@router.post("/", response_model=FAQResponse)
def create_faq(faq: FAQCreate, db: Session = Depends(get_db)):
    faq_repository = FAQRepository(db)

    new_faq = faq_repository.create_faq(
      question=faq.question,
      answer=faq.answer
    )
    return new_faq


# Route for updating a specific faq
@router.put("/{faq_id}", response_model=FAQResponse)
def update_faq(faq_id: int, faq_update: FAQUpdate, db: Session = Depends(get_db)):
    faq_repository = FAQRepository(db)

    updated_faq = faq_repository.update_faq(
      faq_id,
      faq_update.question,
      faq_update.answer,
    )

    if updated_faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")

    return updated_faq
