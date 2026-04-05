import express from 'express';
import upload from '../middleware/upload.js';
import { uploadImage } from '../controllers/uploadController.js';
import auth from '../middleware/auth.js';
import fs from 'fs';
import path from 'path';

const logToFile = (msg) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(path.join(process.cwd(), 'upload_debug.log'), `[${timestamp}] ${msg}\n`);
};

const router = express.Router();

router.post('/', auth, (req, res, next) => {
  logToFile('[Upload Route] POST request received');
  upload.single('image')(req, res, (err) => {
    if (err) {
      logToFile(`[Upload Route] Multer/Cloudinary error: ${err.message}`);
      if (err.stack) logToFile(`[Upload Route] Stack: ${err.stack}`);
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      logToFile(`[Upload Route] No file in request. Content-Type: ${req.headers['content-type']}`);
    } else {
      logToFile(`[Upload Route] File uploaded successfully: ${req.file.path}`);
    }
    next();
  });
}, uploadImage);

export default router;
