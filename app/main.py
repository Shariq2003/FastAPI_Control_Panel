from fastapi import FastAPI, Request, Response
from sqlalchemy.orm import Session
from . import models, database
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from fastapi_redis_cache import FastApiRedisCache, cache
from .routes.routes import routes

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

def init_cache():
    redis_cache = FastApiRedisCache()
    redis_cache.init(
        host_url=f"redis://:{settings.REDIS_PASSWORD}@{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_DB}",
        prefix="myapi-cache",
        response_header="X-MyAPI-Cache",
        ignore_arg_types=[Request, Response, Session]
    )

init_cache()

#Routes
app.include_router(routes)