import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  type: { type: String, enum: ['hard', 'soft'], default: 'hard' },
  icon: { type: String },
  order: { type: Number, default: 0 },
});

export default mongoose.model('Skill', SkillSchema);
