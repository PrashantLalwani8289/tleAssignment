from typing import Union
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.schemas import ResponseModal
from app.database import db_connection
from app.features.userAuth.repository import (
   login,
   signup,
)
from app.features.userAuth.schemas import (
    UserSchema,
    LoginUserSchema
)
from app.utils.routes import routes

user_router = APIRouter(prefix=routes.USER)



@user_router.post(routes.SIGNUP, response_model=ResponseModal)
async def signup_user(request: UserSchema, db: Session = Depends(db_connection)):
    return await signup(request, db)



@user_router.post(routes.LOGIN, response_model=ResponseModal)
async def login_user(request: LoginUserSchema, db: Session = Depends(db_connection)):
    return await login(request, db)

