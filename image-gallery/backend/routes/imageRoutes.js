import express from 'express';
import { uploadImage, getImages, deleteImage } from '../controllers/imageController.js';
import upload from '../config/multer.js';
const router = express.Router();

router.post('/', upload.single('image'), uploadImage);
router.get('/', getImages);
router.delete('/:id', deleteImage);

export default router;
