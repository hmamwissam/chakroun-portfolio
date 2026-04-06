import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const connectCloudinary = async () => {
    const name = process.env.CLOUDINARY_NAME;
    const key = process.env.CLOUDINARY_API_KEY;
    const secret = process.env.CLOUDINARY_SECRET_KEY;

    console.log('--- Cloudinary Configuration Check ---');
    console.log('CLOUDINARY_NAME:', name ? 'FOUND' : 'MISSING ❌');
    console.log('CLOUDINARY_API_KEY:', key ? 'FOUND' : 'MISSING ❌');
    console.log('CLOUDINARY_SECRET_KEY:', secret ? 'FOUND' : 'MISSING ❌');

    if (!name || !key || !secret) {
        console.error('CRITICAL: Cloudinary credentials missing. Uploads will fail!');
        return;
    }

    try {
        cloudinary.config({
            cloud_name: name,
            api_key: key,
            api_secret: secret
        });
        console.log('Cloudinary Configured Successfully ✅');
    } catch (error) {
        console.error('Cloudinary Configuration Error:', error.message);
    }
};

export default connectCloudinary;
