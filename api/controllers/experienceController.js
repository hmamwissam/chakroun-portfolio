import Experience from '../models/Experience.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData, generateId } from '../utils/dbFallback.js';

export const getExperience = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getFallbackData('experience'));
    }
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences.length > 0 ? experiences : getFallbackData('experience'));
  } catch (err) {
    res.json(getFallbackData('experience'));
  }
};

export const createExperience = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let experience = getFallbackData('experience') || [];
      const newExp = { ...req.body, _id: generateId() };
      experience.push(newExp);
      saveFallbackData('experience', experience);
      return res.status(201).json(newExp);
    }
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let experience = getFallbackData('experience') || [];
      const index = experience.findIndex(e => e._id === req.params.id);
      if (index !== -1) {
        experience[index] = { ...experience[index], ...req.body };
        saveFallbackData('experience', experience);
        return res.json(experience[index]);
      }
      return res.status(404).json({ message: 'Expérience introuvable dans le profil de secours' });
    }
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let experience = getFallbackData('experience') || [];
      const filtered = experience.filter(e => e._id !== req.params.id);
      saveFallbackData('experience', filtered);
      return res.json({ message: 'Expérience supprimée du profil de secours' });
    }
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expérience supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
