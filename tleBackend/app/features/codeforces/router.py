from typing import List
from app.database import db_connection
from app.features.codeforces.schema import AddLink
from fastapi import APIRouter, Depends, Body
from app.features.codeforces.repository import (
    add_multiple_link,
    get_contests,
    add_link,
    update_link,
    get_links,
)
from sqlalchemy.orm import Session

from app.common.schemas import ResponseModal


from app.utils.routes import routes

codeforces_router = APIRouter(prefix=routes.CODEFORCES)


@codeforces_router.get(routes.GET_CODEFORCES_CONTESTS, response_model=ResponseModal)
async def get_codeforces_contests():
    return await get_contests()

@codeforces_router.post(routes.ADD_PCD_LINK, response_model=ResponseModal)
async def add_pcd_link(request: AddLink, db: Session = Depends(db_connection)):
    return await add_link(request, db)

@codeforces_router.post(routes.ADD_MULTIPLE_PCD_LINK, response_model=ResponseModal)
async def add_multiple_pcd_link(request: list[AddLink] = Body(...), db: Session = Depends(db_connection)):
    return await add_multiple_link(request, db)

@codeforces_router.post(routes.UPDATE_PCD_LINK, response_model=ResponseModal)
async def update_pcd_link(request: AddLink, db: Session = Depends(db_connection)):
    return await update_link(request, db)


@codeforces_router.get(routes.GET_PCD_LINKS, response_model=ResponseModal)
async def get_pcd_links( db: Session = Depends(db_connection)):
    return await get_links( db)


