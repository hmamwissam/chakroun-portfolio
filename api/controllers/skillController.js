import Skill from '../models/Skill.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData, generateId } from '../utils/dbFallback.js';

export const getSkills = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getFallbackData('skills'));
    }
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills.length > 0 ? skills : getFallbackData('skills'));
  } catch (err) {
    res.json(getFallbackData('skills'));
  }
};

export const createSkill = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let skills = getFallbackData('skills') || [];
      const newSkill = { ...req.body, _id: generateId() };
      skills.push(newSkill);
      saveFallbackData('skills', skills);
      return res.status(201).json(newSkill);
    }
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let skills = getFallbackData('skills') || [];
      const index = skills.findIndex(s => s._id === req.params.id);
      if (index !== -1) {
        skills[index] = { ...skills[index], ...req.body };
        saveFallbackData('skills', skills);
        return res.json(skills[index]);
      }
      return res.status(404).json({ message: 'Compétence introuvable dans le profil de secours' });
    }
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let skills = getFallbackData('skills') || [];
      const filtered = skills.filter(s => s._id !== req.params.id);
      saveFallbackData('skills', filtered);
      return res.json({ message: 'Compétence supprimée du profil de secours' });
    }
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Compétence supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
