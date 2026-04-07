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
    const isOffline = mongoose.connection.readyState !== 1;

    // Use memory cache if available and within TTL
    if (cacheData && Date.now() - lastCacheTime < CACHE_TTL) {
      res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
      return res.json(cacheData);
    }

    const [hero, skills, projects, experience, training, education, quote, contactInfo] = await Promise.all([
      isOffline ? Promise.resolve(getFallbackData('hero')) : Hero.findOne(),
      isOffline ? Promise.resolve(getFallbackData('skills')) : Skill.find().sort({ order: 1 }),
      isOffline ? Promise.resolve(getFallbackData('projects')) : Project.find().sort({ order: 1 }),
      isOffline ? Promise.resolve(getFallbackData('experience')) : Experience.find().sort({ order: 1 }),
      isOffline ? Promise.resolve(getFallbackData('training')) : Training.findOne(),
      isOffline ? Promise.resolve(getFallbackData('education')) : Education.findOne(),
      isOffline ? Promise.resolve(getFallbackData('quote')) : Quote.findOne(),
      isOffline ? Promise.resolve(getFallbackData('contact')) : ContactInfo.findOne()
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

    if (!isOffline) {
      cacheData = responseData;
      lastCacheTime = Date.now();
    }

    res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
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
