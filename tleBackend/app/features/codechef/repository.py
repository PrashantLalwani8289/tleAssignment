from bs4 import BeautifulSoup
import requests
CODECHEF_URL = "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"

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