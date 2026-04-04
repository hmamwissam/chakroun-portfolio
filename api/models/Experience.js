import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  desc: { type: String },
  details: [{ type: String }],
  current: { type: Boolean, default: false },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

export default mongoose.model('Experience', ExperienceSchema);
