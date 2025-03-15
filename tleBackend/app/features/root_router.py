
from fastapi import APIRouter

from .userAuth.router import user_router as auth_router
from .codechef.router import codechef_router as codechef_router
from .codeforces.router import codeforces_router as codeforces_router
from .leetcode.router import leetcode_router as leetcode_router
router = APIRouter()


router.include_router(router=auth_router)
router.include_router(router=codechef_router)
router.include_router(router=codeforces_router)
router.include_router(router=leetcode_router)