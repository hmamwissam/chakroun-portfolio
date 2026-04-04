import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  tags: [{ type: String }],
  icon: { type: String, default: 'Settings' },
  image: { type: String },
  images: [{ type: String }],
  order: { type: Number, default: 0 },
});

export default mongoose.model('Project', ProjectSchema);
