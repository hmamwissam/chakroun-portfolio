import Training from '../models/Training.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData } from '../utils/dbFallback.js';
import { clearPortfolioCache } from './portfolioController.js';

export const getTraining = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      return res.json(getFallbackData('training'));
    }
    const training = await Training.findOne();
    if (training && training.sessions) {
      training.sessions.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    res.json(training || getFallbackData('training'));
  } catch (err) {
    res.json(getFallbackData('training'));
  }
};

export const updateTraining = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      saveFallbackData('training', req.body);
      clearPortfolioCache();
      return res.json(req.body);
    }
    const training = await Training.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    clearPortfolioCache();
    res.json(training);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
