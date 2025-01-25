import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://razeenproject.onrender.com";

const UpdateMetadata = ({ imageId, onUpdate }) => {
  const [metadata, setMetadata] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}/images/${imageId}/metadata`, {
        metadata,
        status,
      });
      toast.success("Metadata updated successfully!");
      onUpdate(); // Notify parent to refresh the list
    } catch (error) {
      console.error("Error updating metadata:", error);
      toast.error("Failed to update metadata.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id={`updateMetadataModal-${imageId}`}
        tabIndex="-1"
        aria-labelledby="updateMetadataModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateMetadataModalLabel">
                Update Metadata
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="metadata" className="form-label">
                  Metadata
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="metadata"
                  value={metadata}
                  onChange={(e) => setMetadata(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processed">Processed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
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
    </div>
  );
};

// Initialize Toastify
toast.configure();

export default UpdateMetadata;
