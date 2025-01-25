import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://razeenproject.onrender.com";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [metadata, setMetadata] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleMetadataChange = (event) => {
    setMetadata(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !metadata) {
      toast.error("Please select an image and provide metadata!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("metadata", metadata);

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/images/`, formData);
      toast.success("Image uploaded successfully!");
      setSelectedFile(null);
      setMetadata("");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
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
      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Upload"
        )}
      </button>
    </div>
  );
};

// Initialize Toastify
toast.configure();

export default ImageUpload;
