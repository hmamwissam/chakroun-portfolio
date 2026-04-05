import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectCloudinary = async () => {
    // Add logs to verify these are being loaded
    console.log('Cloudinary Config Loading...');
    console.log('Name:', process.env.CLOUDINARY_NAME ? 'Loaded' : 'Missing');
    console.log('Key:', process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'Missing');
    console.log('Secret:', process.env.CLOUDINARY_SECRET_KEY ? 'Loaded' : 'Missing');

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
};

export default connectCloudinary;
// Trigger restart
