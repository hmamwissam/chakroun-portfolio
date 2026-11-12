import express from 'express';
import upload from '../middleware/upload.js';
import { uploadImage } from '../controllers/uploadController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error(`[Upload Route] Multer/Cloudinary error: ${err.message}`);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadImage);

export default router;
