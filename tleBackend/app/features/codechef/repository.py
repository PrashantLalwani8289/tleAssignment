from bs4 import BeautifulSoup
import requests
from app.config import env_variables

env_data = env_variables()
CODECHEF_URL = env_data["CODECHEF_URL"]

async def get_contests():
    try:
        response = requests.get(CODECHEF_URL)
        data = response.json()
        
        # Merge all contests into a single list
        all_contests = (
            data.get("future_contests", []) + 
            data.get("present_contests", []) + 
            data.get("past_contests", []) + 
            data.get("practice_contests", [])
        )

        return {
            "success": True,
            "data": all_contests, 
            "message": "Fetched all contest details successfully"
        }

    except requests.exceptions.RequestException as e:
        print(str(e))
        return {
            "success": False,
            "message": "Error fetching contest details"
        }