from typing import List

import requests
from app.database import db_connection
from app.features.codeforces.schema import AddLink
from fastapi import APIRouter, Depends, Body, Request, Query, Response
import xml.etree.ElementTree as ET

from app.features.codeforces.repository import (
    add_multiple_link,
    get_contests,
    add_link,
    update_link,
    get_links,
    get_contest_id_from_video
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


@codeforces_router.api_route(routes.YOUTUBE_WEBHOOK, methods=["GET", "POST"])
async def youtube_webhook(
    request: Request, hub_challenge: str = Query(None, alias="hub.challenge"), db: Session = Depends(db_connection)
):
    """
    Handles YouTube PubSubHubbub webhook verification (GET) and video notification processing (POST).
    """
    hub_mode = request.query_params.get("hub.mode")
    hub_challenge = request.query_params.get("hub.challenge")
    
    if request.method == "GET":
        if hub_mode == "subscribe" and hub_challenge:
            return Response(content=hub_challenge, media_type="text/plain")
    elif request.method == "POST":
        try:
            body = await request.body()
            xml_data = ET.fromstring(body)
            
            
            for entry in xml_data.findall("{http://www.w3.org/2005/Atom}entry"):
                video_id = entry.find("{http://www.w3.org/2005/Atom}id").text.split(":")[-1]
                video_url = f"https://www.youtube.com/watch?v={video_id}"
                
                
                contest_id = get_contest_id_from_video(video_id)
                if contest_id:
                    
                    add_link_request = {"url": video_url, "contest_id": contest_id}
                    add_link(add_link_request, db)
                    return {"message": "Notification received", "success": True}
        except Exception as e:
            print("Error:", e)
            return {"message": "Failed to process notification", "success": False}


