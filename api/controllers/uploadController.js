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
    
    // Fallback: Save to local storage
    try {
      const timestamp = Date.now();
      const originalName = req.file.originalname || 'image.png';
      const ext = path.extname(originalName);
      const filename = `upload-${timestamp}${ext || '.png'}`;
      const uploadDir = path.join(process.cwd(), 'uploads');
      const uploadPath = path.join(uploadDir, filename);
      
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(uploadPath, req.file.buffer);
      
      console.log(`[FALLBACK SUCCESS] Local upload: /uploads/${filename}`);
      
      res.status(200).json({
        message: 'Upload successful (Cloudinary unavailable, using local storage)',
        filePath: `/uploads/${filename}`,
        storage: 'local'
      });
    } catch (fallbackErr) {
      console.error('[FALLBACK FAILED]:', fallbackErr.message);
      res.status(500).json({ 
        message: 'Upload failed (both Cloudinary and local)',
        error: fallbackErr.message 
      });
    }
  }
};
