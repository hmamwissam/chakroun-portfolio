import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  name: { type: String, default: 'Mohamed Chakroun' },
  badge: { type: String, default: 'Precision & Leadership' },
  tagline: { type: String, default: 'Mechanical Engineer & JCI Trainer. Bridging the gap between technical precision and human potential.' },
  statValue: { type: String, default: '50+' },
  statLabel: { type: String, default: 'Trainings Delivered' },
  btnPrimaryLabel: { type: String, default: 'VIEW ENGINEERING' },
  btnPrimaryHref: { type: String, default: '#engineering' },
  btnSecondaryLabel: { type: String, default: 'LEADERSHIP' },
  btnSecondaryHref: { type: String, default: '#training' },
  image: { type: String, default: '/uploads/default-hero.png' },
});

export default mongoose.model('Hero', HeroSchema);
