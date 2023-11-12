from fastapi import FastAPI
from routers import plugins, user_plugins, users, tags, plugin_tag
from database import Base,engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(plugins.router, prefix="/plugins", tags=["plugins"])
app.include_router(tags.router, prefix="/tags", tags=["tags"])
app.include_router(user_plugins.router, prefix="/users", tags=["user_plugins"])
app.include_router(plugin_tag.router, prefix="/tags", tags=["tag_plugins"])
