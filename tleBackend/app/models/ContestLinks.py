
from app.database import Base
from sqlalchemy import  Column, String, Integer



class ContestLinks(Base):
    __tablename__ = 'contest_links'
    id = Column(Integer, primary_key=True)
    contest_id= Column(String, nullable=False, unique = True)
    url = Column(String, nullable=False, unique=True)
    
    
    def to_dict(self):
        return{
            'id': self.id,
            'contest_id': self.contest_id,
            'url': self.url
        }