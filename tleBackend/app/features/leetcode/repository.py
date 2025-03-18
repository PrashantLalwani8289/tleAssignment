import requests


from fastapi import FastAPI, Query
import httpx
from app.config import env_variables

env_data = env_variables()

LEETCODE_URL = env_data["LEETCODE_URL"]


async def get_past_contests(pageNo: int = 1, numPerPage: int = 100):
    try:
        GRAPHQL_QUERY = """
query pastContests($pageNo: Int, $numPerPage: Int) {
  pastContests(pageNo: $pageNo, numPerPage: $numPerPage) {
    pageNum
    currentPage
    totalNum
    numPerPage
    data {
      title
      titleSlug
      startTime
      originStartTime
      cardImg
      sponsors {
        name
        lightLogo
        darkLogo
      }
    }
  }
}
"""
        payload = {
            "operationName": "pastContests",
            "query": GRAPHQL_QUERY,
            "variables": {
                "pageNo": pageNo,
                "numPerPage": numPerPage
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(LEETCODE_URL, json=payload)
        print(response, "success")
        data = response.json().get("data", {}).get("pastContests", {}).get("data", {})
        print(data, "success")
        return data
    except Exception as e:
        return {
            "message": str(e),
            "success": False
        }





async def fetch_top_two_contests():
    GRAPHQL_QUERY = """
query topTwoContests {
  topTwoContests {
    title
    titleSlug
    startTime
    cardImg
    duration
  }
}
"""
    payload = {
        "operationName": "topTwoContests",  # ✅ Matching the query name
        "query": GRAPHQL_QUERY
    }

    headers = {
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(LEETCODE_URL, json=payload, headers=headers)

    print(response, "success")
    print(response.json(), "success")

    if response.status_code == 200:
        return response.json().get("data", {}).get("topTwoContests", [])
    else:
        return {"error": f"Request failed with status {response.status_code}"}


async def get_contests():
    past_contests = await get_past_contests()
    top_contests = await fetch_top_two_contests()
    return {
        "data":top_contests + past_contests,
        "success": True,
        "message": "Fetched past and top contests successfully"
    }