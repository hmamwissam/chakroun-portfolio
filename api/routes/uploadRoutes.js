import express from 'express';
import upload from '../middleware/upload.js';
import { uploadImage } from '../controllers/uploadController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Publicly accessible for now, but usually protected by auth
router.post('/', auth, upload.single('image'), uploadImage);

export default router;
