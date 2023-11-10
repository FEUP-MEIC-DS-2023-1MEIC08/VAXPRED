from sqlalchemy import Column, Integer, String, ForeignKey, Table, DateTime, text, UniqueConstraint, event, DDL
from sqlalchemy.orm import relationship
from database import Base

user_plugin_association = Table(
    'user_plugin_association',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('plugin_id', Integer, ForeignKey('plugins.id')),
    Column('association_date', DateTime, server_default=text('CURRENT_TIMESTAMP'), nullable=False),
    Column('duration', Integer, nullable=True),
    UniqueConstraint('user_id', 'plugin_id', name='unique_user_plugin')
)

plugin_category_association = Table(
    'plugin_category_association',
    Base.metadata,
    Column('plugin_id', Integer, ForeignKey('plugins.id')),
    Column('category_id', Integer, ForeignKey('categories.id')),
    UniqueConstraint('plugin_id', 'category_id', name='unique_plugin_category')
)


class Plugin(Base):
    __tablename__ = 'plugins'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True, index=True)
    version = Column(String, nullable=False)
    description = Column(String, nullable = False)
    developer = Column(String, nullable = False)
    release_date = Column(DateTime, server_default=text('CURRENT_TIMESTAMP'), nullable=False)
    last_update_date = Column(DateTime, server_default=text('CURRENT_TIMESTAMP'), nullable=False)
    supplier_name = Column(String, nullable=False) 
    supplier_email = Column(String, nullable=False)
    contract_duration = Column(Integer, nullable=True)
    search_text = Column(String,default='')

    users = relationship("User", secondary=user_plugin_association, back_populates="plugins")
    categories = relationship("Category", secondary=plugin_category_association, back_populates="plugins")

update_search_text_trigger = DDL('''
CREATE TRIGGER set_search_text_trigger 
AFTER INSERT ON plugins
BEGIN
    UPDATE plugins
    SET search_text = NEW.name || ' ' || NEW.description
    WHERE id = NEW.id;
END;
''')

event.listen(Plugin.__table__, 'after_create', update_search_text_trigger)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String,  nullable=False, unique=True, index=True)
    email = Column(String, unique=True)

    plugins = relationship("Plugin", secondary=user_plugin_association, back_populates="users")


class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String,  nullable=False, unique=True, index=True)

    plugins = relationship("Plugin", secondary=plugin_category_association, back_populates="categories")

