import axios from "axios";

// Base URL for the FastAPI backend
const BASE_URL = "https://razeenproject.onrender.com";

/**
 * Upload a new image with metadata and status.
 * @param {Object} imageData - The image data to upload.
 * @returns {Promise<Object>} - The uploaded image details.
 */
export const uploadImage = async (imageData) => {
  const response = await axios.post(`${BASE_URL}/images/`, imageData);
  return response.data;
};

/**
 * Fetch all images from the backend.
 * @returns {Promise<Array>} - List of images with their metadata and status.
 */
export const fetchImages = async () => {
  const response = await axios.get(`${BASE_URL}/images/`);
  return response.data;
};

/**
 * Update metadata and status for a specific image.
 * @param {number} imageId - The ID of the image to update.
 * @param {Object} updateData - The new metadata and/or status.
 * @returns {Promise<Object>} - The updated image details.
 */
export const updateImageMetadata = async (imageId, updateData) => {
  const response = await axios.patch(
    `${BASE_URL}/images/${imageId}/metadata`,
    updateData
  );
  return response.data;
};

/**
 * Delete a specific image.
 * @param {number} imageId - The ID of the image to delete.
 * @returns {Promise<Object>} - Confirmation of deletion.
 */
export const deleteImage = async (imageId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/images/${imageId}`);
    return response.data; // Return the success response from the backend
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
