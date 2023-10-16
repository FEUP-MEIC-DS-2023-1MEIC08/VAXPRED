from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base
from .user_plugin_association import user_plugin_association

class User(Base):
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True, index=True)
  username = Column(String,  nullable=False, unique=True, index=True)
  email = Column(String)

  plugins = relationship("Plugin", secondary=user_plugin_association, back_populates="users")
