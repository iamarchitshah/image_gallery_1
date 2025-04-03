import Image from '../models/Image.js';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    const { title, tags } = req.body;
    const result = await cloudinary.uploader.upload_stream({
      folder: 'gallery',
    }, async (error, result) => {
      if (error) return res.status(500).json({ error });
      const image = new Image({ title, tags: tags.split(','), imageUrl: result.secure_url });
      await image.save();
      res.status(201).json(image);
    }).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const { tag } = req.query;
    const query = tag ? { tags: tag } : {};
    const images = await Image.find(query);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

