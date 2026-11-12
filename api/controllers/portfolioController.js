import Hero from '../models/Hero.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Training from '../models/Training.js';
import Education from '../models/Education.js';
import Quote from '../models/Quote.js';
import ContactInfo from '../models/ContactInfo.js';
import mongoose from 'mongoose';
import { getFallbackData } from '../utils/dbFallback.js';

let cacheData = null;
let lastCacheTime = 0;
const CACHE_TTL = 1000 * 60; // 1 minute in-memory cache

export const clearPortfolioCache = () => {
  cacheData = null;
  lastCacheTime = 0;
};

export const getPortfolioData = async (req, res) => {
  try {
    // Check if MongoDB is disconnected (0 = disconnected)
    const isDisconnected = mongoose.connection.readyState === 0;

    // Use memory cache if available and within TTL
    if (cacheData && Date.now() - lastCacheTime < CACHE_TTL) {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.json(cacheData);
    }

    const [hero, skills, projects, experience, training, education, quote, contactInfo] = await Promise.all([
      isDisconnected ? Promise.resolve(getFallbackData('hero')) : Hero.findOne(),
      isDisconnected ? Promise.resolve(getFallbackData('skills')) : Skill.find().sort({ order: 1 }),
      isDisconnected ? Promise.resolve(getFallbackData('projects')) : Project.find().sort({ order: 1 }),
      isDisconnected ? Promise.resolve(getFallbackData('experience')) : Experience.find().sort({ order: 1 }),
      isDisconnected ? Promise.resolve(getFallbackData('training')) : Training.findOne(),
      isDisconnected ? Promise.resolve(getFallbackData('education')) : Education.findOne(),
      isDisconnected ? Promise.resolve(getFallbackData('quote')) : Quote.findOne(),
      isDisconnected ? Promise.resolve(getFallbackData('contact')) : ContactInfo.findOne()
    ]);

    const responseData = {
      hero: hero || getFallbackData('hero'),
      skills: (skills && skills.length > 0) ? skills : getFallbackData('skills'),
      projects: (projects && projects.length > 0) ? projects : getFallbackData('projects'),
      experience: (experience && experience.length > 0) ? experience : getFallbackData('experience'),
      training: training || getFallbackData('training'),
      education: education || getFallbackData('education'),
      quote: quote || getFallbackData('quote'),
      contactInfo: contactInfo || getFallbackData('contact')
    };

    if (!isDisconnected && mongoose.connection.readyState === 1) {
      cacheData = responseData;
      lastCacheTime = Date.now();
    }

    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json(responseData);
  } catch (err) {
    console.error('Portfolio bootstrap error:', err);
    // Return all fallback data on error
    res.json({
      hero: getFallbackData('hero'),
      skills: getFallbackData('skills'),
      projects: getFallbackData('projects'),
      experience: getFallbackData('experience'),
      training: getFallbackData('training'),
      education: getFallbackData('education'),
      quote: getFallbackData('quote'),
      contactInfo: getFallbackData('contact')
    });
  }
};
