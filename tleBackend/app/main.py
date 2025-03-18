import asyncio
import aiohttp
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address



from .core.config import settings
from .features.root_router import router as root_router

async def subscribe_to_youtube(channel_id: str, callback_url: str):
    HUB_URL = "https://pubsubhubbub.appspot.com/subscribe"
    topic_url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
    
    data = {
        "hub.callback": callback_url,
        "hub.mode": "subscribe",
        "hub.topic": topic_url,
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(HUB_URL, data=data) as response:
            print(response) 
            return await response.text()

def get_application():
    limiter = Limiter(key_func=get_remote_address)
    _app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    _app.state.limiter = limiter
    _app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    _app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            # "http://localhost:5173",
            # "http://localhost:5174",
            # "ws://localhost:5173",
            # "ws://localhost:5174",
            "*",
        ],
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS", "*"],
        allow_headers=["*"],
    )
    asyncio.create_task(
        subscribe_to_youtube(
            "-----------------------------",  # here goes the tle's Youtube channel id 
            "https://5cd2-122-160-11-153.ngrok-free.app/api/v1/codeforces/youtube-webhook" # here goes the webhook route for the created webhook to handle the add link request from the tle's youtube channel.
        )
    )

    _app.include_router(router=root_router, prefix=settings.API_V1_STR)

    return _app


app = get_application()
