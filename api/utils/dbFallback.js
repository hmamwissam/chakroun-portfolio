import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/db.json');

export const getFallbackData = (key) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    return data[key];
  } catch (err) {
    console.error('Fallback data error:', err);
    return null;
  }
};

export const saveFallbackData = (key, newData) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    data[key] = newData;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Fallback save error:', err);
    return false;
  }
};

export const generateId = () => {
  return new mongoose.Types.ObjectId().toString();
};

export const wrapRoute = (modelKey, mongooseMethod = 'find', mongooseQuery = {}) => async (req, res) => {
  try {
    // Check if MongoDB is actually connected (1 = connected)
    if (mongoose.connection.readyState !== 1) {
       console.log(`[Offline Mode] Serving ${modelKey} from JSON`);
       const data = getFallbackData(modelKey);
       return res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
