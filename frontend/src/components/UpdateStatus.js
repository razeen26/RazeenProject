import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://razeenproject.onrender.com";

const UpdateStatus = () => {
  const [imageId, setImageId] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${BASE_URL}/images/${imageId}/metadata`, {
        status,
      });
      console.log("Updated Status:", response);
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Check the console for details.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Status</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
        <div className="mb-3">
          <label htmlFor="imageId" className="form-label">Image ID</label>
          <input
            type="text"
            className="form-control"
            id="imageId"
            placeholder="Enter image ID"
            value={imageId}
            onChange={(e) => setImageId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Processed">Processed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateStatus;
