import Education from '../models/Education.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData } from '../utils/dbFallback.js';

export const getEducation = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getFallbackData('education'));
    }
    const education = await Education.findOne();
    res.json(education || getFallbackData('education'));
  } catch (err) {
    res.json(getFallbackData('education'));
  }
};

export const updateEducation = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
       saveFallbackData('education', req.body);
       return res.json(req.body);
    }
    const education = await Education.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
