from pydantic import BaseModel, Field
from typing import Optional


class ImageCreate(BaseModel):
    file_path: str
    image_metadata: str
    status: str


class ImageRead(BaseModel):
    id: int
    file_path: str
    image_metadata: str
    status: str

    class Config:
        from_attributes = True


class ImageUpdate(BaseModel):
    file_path: Optional[str] = None
    image_metadata: Optional[str] = None
    status: Optional[str] = None


class ImageMetadata(BaseModel):
    metadata: str
    status: str
