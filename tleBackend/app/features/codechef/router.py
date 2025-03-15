from fastapi import APIRouter, Depends
from app.features.codechef.repository import (
    get_contests
)
from sqlalchemy.orm import Session

from app.common.schemas import ResponseModal


from app.utils.routes import routes

codechef_router = APIRouter(prefix=routes.CODECHEF)


@codechef_router.get(routes.GET_CODECHEF_CONTESTS, response_model=ResponseModal)
async def get_codechef_contests():
    return await get_contests()

