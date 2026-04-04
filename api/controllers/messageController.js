import Message from '../models/Message.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData, generateId } from '../utils/dbFallback.js';

export const createMessage = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let messages = getFallbackData('messages') || [];
      const newMessage = { 
        ...req.body, 
        _id: generateId(), 
        read: false, 
        createdAt: new Date().toISOString() 
      };
      messages.push(newMessage);
      saveFallbackData('messages', messages);
      return res.status(201).json(newMessage);
    }
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getFallbackData('messages') || []);
    }
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages.length > 0 ? messages : getFallbackData('messages') || []);
  } catch (err) {
    res.json(getFallbackData('messages') || []);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let messages = getFallbackData('messages') || [];
      const filtered = messages.filter(m => m._id !== req.params.id);
      saveFallbackData('messages', filtered);
      return res.json({ message: 'Message supprimé du profil de secours' });
    }
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markRead = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let messages = getFallbackData('messages') || [];
      const index = messages.findIndex(m => m._id === req.params.id);
      if (index !== -1) {
        messages[index].read = true;
        saveFallbackData('messages', messages);
        return res.json(messages[index]);
      }
      return res.status(404).json({ message: 'Message introuvable dans le profil de secours' });
    }
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
