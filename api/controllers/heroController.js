import Hero from '../models/Hero.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData } from '../utils/dbFallback.js';

export const getHero = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getFallbackData('hero'));
    }
    const hero = await Hero.findOne();
    res.json(hero || getFallbackData('hero'));
  } catch (err) {
    res.json(getFallbackData('hero'));
  }
};

export const updateHero = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      saveFallbackData('hero', req.body);
      return res.json(req.body);
    }
    const hero = await Hero.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
