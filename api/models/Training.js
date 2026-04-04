import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  label: String,
  value: String,
  icon: String,
  order: Number
});

const RoleSchema = new mongoose.Schema({
  year: String,
  title: String,
  sub: String,
  desc: String,
  image: String,
  order: Number
});

const SessionSchema = new mongoose.Schema({
  title: String,
  date: String,
  desc: String,
  image: String,
  order: Number
});

const TrainingSchema = new mongoose.Schema({
  bio: { type: String },
  featuredWorkshop: { type: String },
  topics: [{ type: String }],
  stats: [StatSchema],
  roles: [RoleSchema],
  sessions: [SessionSchema],
  featuredWorkshopImage: String,
});

export default mongoose.model('Training', TrainingSchema);
