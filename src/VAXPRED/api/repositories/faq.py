from typing import List
from sqlalchemy.orm import Session
from models import FAQ

class FAQRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_faq(self, question: str, answer: str) -> FAQ:
        faq = FAQ(
            question = question,
            answer = answer
        )
        self.db.add(faq)
        self.db.commit()
        self.db.refresh(faq)
        return faq

    def get_faq_by_id(self, faq_id: int) -> FAQ:
        return self.db.query(FAQ).filter(FAQ.id == faq_id).first()

    def get_faq_by_name(self, name: str) -> FAQ:
        return self.db.query(FAQ).filter(FAQ.name == name).first()

    def get_all_faqs(self) -> List[FAQ]:
        return self.db.query(FAQ).all()

    def delete_faq_by_id(self, faq_id : int) -> None:
      faq = self.db.query(FAQ).filter(FAQ.id == faq_id).first()
      if faq is not None:
        self.db.delete(faq)
        self.db.commit()

    def update_faq(self, faq_id: int, question: str, answer: str) -> FAQ:
      existing_faq = self.db.query(FAQ).filter(FAQ.id == faq_id).first()

      if existing_faq is None:
        return None

      existing_faq.question = question
      existing_faq.answer = answer

      self.db.commit()
      return existing_faq

