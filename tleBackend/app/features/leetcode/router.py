from fastapi import APIRouter, Depends
from app.features.leetcode.repository import (
    get_contests
)
from sqlalchemy.orm import Session

from app.common.schemas import ResponseModal


from app.utils.routes import routes

leetcode_router = APIRouter(prefix=routes.LEETCODE)


@leetcode_router.get(routes.GET_LEETCODE_CONTESTS, response_model=ResponseModal)
async def get_leetcode_contests():
    return await get_contests()

