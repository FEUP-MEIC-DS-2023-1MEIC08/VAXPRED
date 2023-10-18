from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

user_plugin_association = Table(
    'user_plugin_association',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('plugin_id', Integer, ForeignKey('plugins.id'))
)


class Plugin(Base):
    __tablename__ = 'plugins'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True, index=True)
    version = Column(String, nullable=False)

    users = relationship("User", secondary=user_plugin_association, back_populates="plugins")

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String,  nullable=False, unique=True, index=True)
    email = Column(String, unique=True)

    plugins = relationship("Plugin", secondary=user_plugin_association, back_populates="users")
