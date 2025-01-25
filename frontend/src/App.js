import React, { useState, useEffect } from "react";
import ImageUpload from "./components/ImageUpload";
import ImageList from "./components/ImageList";
import axios from "axios";

const App = () => {
  const [images, setImages] = useState([]);

  const refreshImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/images/");
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
