from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String, nullable=False)
    image_metadata = Column(String, nullable=True)
    status = Column(String, default="Pending")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Auto-update timestamp
