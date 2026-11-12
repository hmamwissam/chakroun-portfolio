import Project from '../models/Project.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData, generateId } from '../utils/dbFallback.js';
import { clearPortfolioCache } from './portfolioController.js';

export const getProjects = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      return res.json(getFallbackData('projects'));
    }
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects.length > 0 ? projects : getFallbackData('projects'));
  } catch (err) {
    res.json(getFallbackData('projects'));
  }
};

export const createProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      let projects = getFallbackData('projects') || [];
      const newProject = { ...req.body, _id: generateId() };
      projects.push(newProject);
      saveFallbackData('projects', projects);
      clearPortfolioCache();
      return res.status(201).json(newProject);
    }
    const project = new Project(req.body);
    await project.save();
    clearPortfolioCache();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      let projects = getFallbackData('projects') || [];
      const index = projects.findIndex(p => p._id === req.params.id);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...req.body };
        saveFallbackData('projects', projects);
        clearPortfolioCache();
        return res.json(projects[index]);
      }
      return res.status(404).json({ message: 'Projet introuvable dans le profil de secours' });
    }
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearPortfolioCache();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      let projects = getFallbackData('projects') || [];
      const filtered = projects.filter(p => p._id !== req.params.id);
      saveFallbackData('projects', filtered);
      clearPortfolioCache();
      return res.json({ message: 'Projet supprimé du profil de secours' });
    }
    await Project.findByIdAndDelete(req.params.id);
    clearPortfolioCache();
    res.json({ message: 'Projet supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
