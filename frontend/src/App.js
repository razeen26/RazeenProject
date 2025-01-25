import React, { useState, useEffect } from "react";
import ImageUpload from "./components/ImageUpload";
import ImageList from "./components/ImageList";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Toastify
toast.configure();


// Use the deployed backend URL
const BASE_URL = "https://razeenproject.onrender.com";

const App = () => {
  const [images, setImages] = useState([]);

  const refreshImages = async () => {
    try {
      // Update the URL to use the BASE_URL
      const response = await axios.get(`${BASE_URL}/images/`);
      setImages(response.data); // Assuming backend provides sorted data
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    refreshImages();
  }, []);

  return (
    <div>
      <header className="bg-dark text-white p-3">
        <h1 className="text-center">Image Management System</h1>
      </header>
      <main className="container mt-4">
        <ImageUpload refreshImages={refreshImages} />
        <ImageList images={images} refreshImages={refreshImages} />
      </main>
    </div>
  );
};

export default App;
