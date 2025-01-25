import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected image file
  const [metadata, setMetadata] = useState(""); // State for the metadata input

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update the selected file state
  };

  const handleMetadataChange = (event) => {
    setMetadata(event.target.value); // Update the metadata state
  };

  const handleUpload = async () => {
    if (!selectedFile || !metadata) {
      alert("Please select an image and provide metadata!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // Add the image file to form data
    formData.append("metadata", metadata); // Add metadata to form data

    try {
      await axios.post("http://localhost:8000/images/", formData); // Upload image and metadata
      setSelectedFile(null); // Reset the file input
      setMetadata(""); // Reset the metadata input
      window.location.reload(); // Reload the page to show the updated image list
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Image</h2>
      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">
          Select Image
        </label>
        <input
          type="file"
          id="fileInput"
          className="form-control"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="metadataInput" className="form-label">
          Metadata
        </label>
        <input
          type="text"
          id="metadataInput"
          className="form-control"
          placeholder="Enter metadata"
          value={metadata}
          onChange={handleMetadataChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
