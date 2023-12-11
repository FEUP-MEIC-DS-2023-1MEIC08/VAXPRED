from typing import List, Dict

from sqlalchemy.orm import Session

from models import PluginFaqs


class PluginFaqRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_faqs(self, plugin_id, faqs):
        for faq in faqs:
            question = faq.get('question')
            answer = faq.get('answer')
            if question is not None and answer is not None:
                new_faq = PluginFaqs(question=question, answer=answer, plugin_id=plugin_id)
                self.db.add(new_faq)
        self.db.commit()
        faqs = self.get_faqs_by_plugin_id(plugin_id)
        return faqs

    def get_faqs_by_plugin_id(self, plugin_id) -> List[Dict[str, str]]:
        faqs = self.db.query(PluginFaqs).filter_by(plugin_id=plugin_id).all()
        faq_list = [{'question': faq.question, 'answer': faq.answer} for faq in faqs]
        return faq_list

    def update_faqs(self, plugin_id, new_faqs):
        self.db.query(PluginFaqs).filter_by(plugin_id=plugin_id).delete()

        for faq in new_faqs:
            question = faq.get('question')
            answer = faq.get('answer')
            if question is not None and answer is not None:
                new_faq = PluginFaqs(question=question, answer=answer, plugin_id=plugin_id)
                self.db.add(new_faq)
        self.db.commit()
        faqs = self.get_faqs_by_plugin_id(plugin_id)
        return faqs