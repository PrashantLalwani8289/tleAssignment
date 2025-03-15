
from pydantic import BaseModel

class AddLink(BaseModel):
    url: str
    contest_id: str