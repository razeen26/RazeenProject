import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://razeenproject.onrender.com";

const ImageList = ({ images, refreshImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newMetadata, setNewMetadata] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleEdit = async () => {
    if (!selectedImage) return;

    try {
      setLoadingEdit(true);
      await axios.patch(`${BASE_URL}/images/${selectedImage.id}/metadata`, {
        metadata: newMetadata,
        status: newStatus,
      });
      toast.success("Image metadata updated successfully!");
      setShowEditModal(false);
      refreshImages();
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image. Please try again.");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage) return;

    try {
      setLoadingDelete(true);
      await axios.delete(`${BASE_URL}/images/${selectedImage.id}`);
      toast.success("Image deleted successfully!");
      setShowDeleteModal(false);
      refreshImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    } finally {
      setLoadingDelete(false);
    }
  };

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
                  src={`${BASE_URL}${image.file_path}`}
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
                <button
                  className="btn btn-primary"
                  onClick={handleEdit}
                  disabled={loadingEdit}
                >
                  {loadingEdit ? (
                    <div className="spinner-border spinner-border-sm">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Save Changes"
                  )}
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
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={loadingDelete}
                >
                  {loadingDelete ? (
                    <div className="spinner-border spinner-border-sm">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Initialize Toastify
toast.configure();

export default ImageList;
