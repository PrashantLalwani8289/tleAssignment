from typing import List
import requests
from bs4 import BeautifulSoup
from app.models.ContestLinks import ContestLinks
from sqlalchemy.orm import Session


from app.features.codeforces.schema import AddLink

CODEFORCES_URL = "https://codeforces.com/api/contest.list?gym=false"

async def get_contests():
        try:
            data = requests.get(CODEFORCES_URL)
            return {
                 "success": True,
                 "data": data.json(),
                 "message": "fetched the details"
            }
                 
        except requests.exceptions.RequestException as e:
            print(e.message)
            return { "success": False,
                "message": "error the details"}

async def add_link(request: AddLink, db : Session):
        try:
            print("here")
            new_contest_link = ContestLinks(url=request.url, contest_id = request.contest_id)
            db.add(new_contest_link)
            db.commit()
            db.refresh(new_contest_link)
            return{
                "success": True, 
                "message": "Pcd link added successfully",
            }
        except Exception as e:
            print(e)
            return {
                "success": False, 
                "message": "Error adding pcd link"         
            }

async def add_multiple_link(request: list[AddLink], db : Session):
    try:
        for link in request:
             new_contest_link = ContestLinks(url=link.url, contest_id = link.contest_id)
             db.add(new_contest_link)
        db.commit()
        return{
            "success": True, 
            "message": "Pcd links added successfully",
        }
    except Exception as e:
         print(e)
         return {
              "success": False, 
              "message": str(e)         
         }

async def update_link(request: AddLink, db : Session):
    try:
          
        existing_contest_link = db.query(ContestLinks).filter(ContestLinks.contest_id == request.contest_id).first()
        if not existing_contest_link:
             return {
                  "success": False, 
                  "message": "Contest not found"
             }
        existing_contest_link.url = request.url
        db.commit()
        return{
            "success": True, 
            "message": "Pcd link updated successfully",
        }
    except Exception as e:
         print(e)
         return {
              "success": False, 
              "message": "Error adding pcd link"         
         }
    
async def get_links( db : Session):
    try:
          
        
        links = db.query(ContestLinks).all()
        links = [link.to_dict() for link in links]
        print(links)
        return{
            "success": True, 
            "data": links,
            "message": "Pcd links fetched successfully",
        }
    except Exception as e:
         print(e)
         return {
              "success": False, 
              "message": "Error adding pcd link"         
         }