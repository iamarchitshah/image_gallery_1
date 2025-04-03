import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import Gallery from './components/Gallery';
import axios from 'axios';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    const res = await axios.get('http://localhost:5000/api/images');
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container">
      <h1>Image Gallery</h1>
      <ImageUpload refreshImages={fetchImages} />
      <Gallery images={images} />
    </div>
  );
};

export default App;

