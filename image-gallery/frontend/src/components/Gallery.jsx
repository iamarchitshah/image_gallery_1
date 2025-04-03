import React from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((img) => (
        <div key={img._id} className="card">
          <h3>{img.title}</h3>
          <img src={img.imageUrl} alt={img.title} />
          <p>Tags: {img.tags.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;