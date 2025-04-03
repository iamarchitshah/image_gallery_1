import React, { useState } from "react";
import api from "../api";
import "./ImageUpload.css";

const ImageUpload = ({ refreshImages }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !tags || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("image", image);

    setUploading(true);

    try {
      await api.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      refreshImages(); // Refresh gallery after successful upload
      setTitle("");
      setTags("");
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
