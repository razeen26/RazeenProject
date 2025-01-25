import React, { useState } from "react";
import axios from "axios";

const ImageList = ({ images, refreshImages }) => {
  const [selectedImage, setSelectedImage] = useState(null); // Selected image for editing or deletion
  const [showEditModal, setShowEditModal] = useState(false); // Edit modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete modal state
  const [newMetadata, setNewMetadata] = useState(""); // New metadata for editing
  const [newStatus, setNewStatus] = useState(""); // New status for editing

  const handleEdit = async () => {
    if (!selectedImage) return;

    try {
      await axios.patch(
        `http://localhost:8000/images/${selectedImage.id}/metadata`,
        {
          metadata: newMetadata,
          status: newStatus,
        }
      );
      setShowEditModal(false); // Close modal
      refreshImages(); // Refresh image list
    } catch (error) {
      console.error("Error updating image:", error);
      alert("Failed to update image. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!selectedImage) return;
    try {
      await axios.delete(`http://localhost:8000/images/${selectedImage.id}`);
      setShowDeleteModal(false); // Close modal
      refreshImages(); // Refresh image list
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  // Sort images by updated_at in descending order
  const sortedImages = images.sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  return (
    <div className="container mt-5">
      <h2>Uploaded Images</h2>
      {sortedImages.length === 0 ? (
        <p>No images available. Please upload some images.</p>
      ) : (
        <div className="row">
          {sortedImages.map((image) => (
            <div className="col-md-4 mb-4" key={image.id}>
              <div className="card shadow-sm">
                <img
                  src={`http://localhost:8000${image.file_path}`}
                  alt="Uploaded"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p>
                    <strong>Metadata:</strong>{" "}
                    {image.image_metadata.length > 30
                      ? `${image.image_metadata.substring(0, 30)}...`
                      : image.image_metadata}
                  </p>
                  <p>
                    <strong>Status:</strong> {image.status}
                  </p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => {
                      setSelectedImage(image);
                      setNewMetadata(image.image_metadata);
                      setNewStatus(image.status);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSelectedImage(image);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Image Metadata</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Metadata</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newMetadata}
                    onChange={(e) => setNewMetadata(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processed">Processed</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this image?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageList;
