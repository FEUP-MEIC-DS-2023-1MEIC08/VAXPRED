from sqlalchemy.orm import Session
from ..models.user import User
from ..models.plugin import Plugin
from ..models.user_plugin_association import user_plugin_association

class UserRepository:
    def __init__(self, db: Session):
        self.db = db






