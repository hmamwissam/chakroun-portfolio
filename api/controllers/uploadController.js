import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import fs from 'fs/promises';
import path from 'path';

/**
 * Controller to handle image uploads to Cloudinary.
 * Uses streamifier to stream the buffer directly to Cloudinary.
 */
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload using streamifier for buffer support
    console.log('[Controller] Attempting Cloudinary upload for', req.file.originalname);
    const uploadFromBuffer = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'portfolio',
            resource_type: 'auto',
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer(req);

    res.status(200).json({
      message: 'Upload successful',
      filePath: result.secure_url,
    });
  } catch (err) {
    console.error('[Controller] Cloudinary Upload FAILED:', err.message);
    
    // Check if configuration is missing
    const isConfigMissing = !process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY;
    
    res.status(500).json({ 
      message: 'Upload to Cloudinary failed. Check server environment variables.',
      error: err.message,
      configMissing: isConfigMissing,
      help: "Please ensure CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_SECRET_KEY are set in your hosting provider's (Vercel/Render) dashboard."
    });
  }
};
