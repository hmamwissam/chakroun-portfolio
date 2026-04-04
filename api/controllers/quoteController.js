import Quote from '../models/Quote.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData } from '../utils/dbFallback.js';

export const getQuote = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getFallbackData('quote'));
    }
    const quote = await Quote.findOne();
    res.json(quote || getFallbackData('quote'));
  } catch (err) {
    res.json(getFallbackData('quote'));
  }
};

export const updateQuote = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      saveFallbackData('quote', req.body);
      return res.json(req.body);
    }
    let quote = await Quote.findOne();
    if (!quote) {
      quote = new Quote(req.body);
    } else {
      quote.text1 = req.body.text1 || quote.text1;
      quote.highlight = req.body.highlight || quote.highlight;
      quote.text2 = req.body.text2 || quote.text2;
    }
    await quote.save();
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
