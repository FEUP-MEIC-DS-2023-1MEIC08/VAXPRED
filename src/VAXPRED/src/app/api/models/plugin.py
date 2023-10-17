from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base
from .user_plugin_association import user_plugin_association


class Plugin(Base):
  __tablename__ = 'plugins'
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, nullable=False, unique=True, index=True)
  version = Column(String, nullable=False)

  users = relationship("User", secondary=user_plugin_association, back_populates="plugins")
