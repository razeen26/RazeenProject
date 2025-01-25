from sqlalchemy.orm import Session
from . import models, schemas

def create_image(db: Session, image: schemas.ImageCreate):
    db_image = models.Image(
        file_path=image.file_path,
        image_metadata=image.image_metadata,
        status=image.status,
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

def get_images(db: Session):
    return db.query(models.Image).all()

def get_image(db: Session, image_id: int):
    """
    Retrieve a single image by ID.
    """
    return db.query(models.Image).filter(models.Image.id == image_id).first()

def update_metadata(db: Session, image_id: int, metadata: str, status: str):
    image = db.query(models.Image).filter(models.Image.id == image_id).first()
    if not image:
        return None
    image.image_metadata = metadata
    image.status = status
    db.commit()
    db.refresh(image)
    return image

def delete_image(db: Session, image_id: int):
    image = db.query(models.Image).filter(models.Image.id == image_id).first()
    if not image:
        return False
    db.delete(image)
    db.commit()
    return True

def update_image(db: Session, image_id: int, image_data: schemas.ImageUpdate):
    image = db.query(models.Image).filter(models.Image.id == image_id).first()
    if not image:
        return None
    if image_data.file_path is not None:
        image.file_path = image_data.file_path
    if image_data.image_metadata is not None:
        image.image_metadata = image_data.image_metadata
    if image_data.status is not None:
        image.status = image_data.status
    db.commit()
    db.refresh(image)
    return image
