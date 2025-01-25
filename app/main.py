import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from pathlib import Path
# from .database import SessionLocal, engine
# from . import models, schemas, crud
from app.database import SessionLocal, engine
from app import models, schemas, crud


# Initialize database models
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Directory to store uploaded images
UPLOAD_DIR = Path("uploaded_images")
UPLOAD_DIR.mkdir(exist_ok=True)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/uploaded_images", StaticFiles(directory=UPLOAD_DIR), name="uploaded_images")

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Image API!"}


@app.post("/images/", response_model=schemas.ImageRead)
async def upload_image(
    file: UploadFile = File(...),  # Accept the uploaded image file
    metadata: str = Form(...),    # Accept metadata from form data
    db: Session = Depends(get_db)
):
    """
    Upload an image and its metadata to the database.
    """
    try:
        # Save the uploaded file to the server
        file_path = UPLOAD_DIR / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Create an image entry in the database
        image = schemas.ImageCreate(
            file_path=f"/uploaded_images/{file.filename}",
            image_metadata=metadata,  # Save metadata
            status="Pending",
        )
        result = crud.create_image(db=db, image=image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}")

@app.get("/images/", response_model=list[schemas.ImageRead])
def list_images(db: Session = Depends(get_db)):
    """
    Retrieve all images from the database, sorted by updated_at in descending order.
    """
    return db.query(models.Image).order_by(models.Image.updated_at.desc()).all()


@app.patch("/images/{image_id}/metadata", response_model=schemas.ImageRead)
def update_image_metadata(image_id: int, metadata: schemas.ImageMetadata, db: Session = Depends(get_db)):
    """
    Update metadata and status of a specific image.
    """
    result = crud.update_metadata(db=db, image_id=image_id, metadata=metadata.metadata, status=metadata.status)
    if not result:
        raise HTTPException(status_code=404, detail="Image not found")
    return result

@app.delete("/images/{image_id}")
def delete_image(image_id: int, db: Session = Depends(get_db)):
    """
    Delete an image and its metadata from the database.
    """
    success = crud.delete_image(db=db, image_id=image_id)
    if not success:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"detail": "Image deleted successfully"}

@app.patch("/images/{image_id}", response_model=schemas.ImageRead)
def update_image(
    image_id: int,
    image_data: schemas.ImageUpdate,
    db: Session = Depends(get_db),
):
    """
    Update the image details such as file path, metadata, or status.
    """
    image = crud.update_image(db=db, image_id=image_id, image_data=image_data)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image
