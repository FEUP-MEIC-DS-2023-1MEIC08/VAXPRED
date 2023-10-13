from fastapi import FastAPI
from routers import users, plugins, user_plugins

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(plugins.router, prefix="/plugins", tags=["plugins"])
app.include_router(user_plugins.router, prefix="/user_plugins", tags=["user_plugins"])
