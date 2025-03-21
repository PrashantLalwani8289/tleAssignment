
from datetime import datetime
from passlib.hash import bcrypt
from app.features.userAuth.utils import create_access_token
from sqlalchemy.orm import Session

from app.common import constants
from app.config import env_variables
from app.features.userAuth.schemas import (
    LoginUserSchema,
    UserSchema,
)

from app.models.User import User
from app.models.user_sessions import UserSession

env_data = env_variables()


async def signup(request: UserSchema, db: Session):
    try:
        password_hash = bcrypt.hash(request.password)

        existing_user = (
            db.query(User).filter(User.email == request.email.lower()).first()
        )

        if existing_user:
            return {
                "message": constants.USER_WITH_EMAIL_ALREADY_EXISTS,
                "success": False,
            }
        if request.password != request.confirm_password:
            return {
                "message": "Passwords do not match",
                "success": False,
            }
            # Create a new user object
        new_user = User(
            full_name=request.full_name,
            email=request.email.lower(),
            password=password_hash,
            account_type="user",
            is_active=True,
            last_login=datetime.now(),
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        payload = {"id": new_user.id, "email": new_user.email, "account_type": "user"}
        access_token = create_access_token(payload)
        session = UserSession(user_id=new_user.id, token=access_token.decode())
        db.add(session)
        db.commit()

        return {
            "message": constants.SIGNUP_SUCCESS,
            "success": True,
            "data": {
                "user": {
                    "token": access_token,
                    "name": new_user.full_name,
                    "email": new_user.email,
                    "id": new_user.id,
                },
            },
        }
    except Exception as e:
        print("error in signup", e)
        return {
            "message": constants.INTERNAL_SERVER_ERROR,
            "success": False,
        }


async def login(request: LoginUserSchema, db: Session):
    try:
        existing_user = (
            db.query(User).filter(User.email == request.email.lower()).first()
        )
        if not existing_user:
            return {
                "message": constants.USER_NOT_FOUND,
                "success": False,
            }
        if existing_user and bcrypt.verify(request.password, existing_user.password):
            existing_user.last_login = datetime.now()
            payload = {
                "id": existing_user.id,
                "email": existing_user.email,
                "account_type": "user",
            }
            access_token = create_access_token(payload)
            session = UserSession(user_id=existing_user.id, token=access_token.decode())
            db.add(session)
            db.commit()

            return {
                "message": constants.LOGIN_SUCCESS,
                "success": True,
                "data": {
                    "user": {
                        "token": access_token,
                        "name": existing_user.full_name,
                        "email": existing_user.email,
                        "id": existing_user.id,
                    },
                },
            }

        else:
            return {
                "message": constants.INCORRECT_CREDENTIALS,
                "success": False,
            }

    except Exception as e:
        print("error in login", e)
        return {
            "message": constants.INTERNAL_SERVER_ERROR,
            "success": False,
        }

