from fastapi import FastAPI
from routers import plugins, user_plugins, users
from database import Base,engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(plugins.router, prefix="/plugins", tags=["plugins"])
app.include_router(user_plugins.router, prefix="/user_plugins", tags=["user_plugins"])
