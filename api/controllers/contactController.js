import ContactInfo from '../models/ContactInfo.js';
import mongoose from 'mongoose';
import { getFallbackData, saveFallbackData } from '../utils/dbFallback.js';

export const getContactInfo = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getFallbackData('contact'));
    }
    const contactInfo = await ContactInfo.findOne();
    res.json(contactInfo || getFallbackData('contact'));
  } catch (err) {
    res.json(getFallbackData('contact'));
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      saveFallbackData('contact', req.body);
      return res.json(req.body);
    }
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = new ContactInfo(req.body);
    } else {
      contactInfo.email = req.body.email || contactInfo.email;
      contactInfo.phone = req.body.phone || contactInfo.phone;
      contactInfo.location = req.body.location || contactInfo.location;
      contactInfo.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : contactInfo.linkedin;
      contactInfo.instagram = req.body.instagram !== undefined ? req.body.instagram : contactInfo.instagram;
      contactInfo.facebook = req.body.facebook !== undefined ? req.body.facebook : contactInfo.facebook;
    }
    await contactInfo.save();
    res.json(contactInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
