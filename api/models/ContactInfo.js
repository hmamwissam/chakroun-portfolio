import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  linkedin: { type: String },
  instagram: { type: String },
  facebook: { type: String },
}, { timestamps: true });

export default mongoose.model('ContactInfo', contactInfoSchema);
