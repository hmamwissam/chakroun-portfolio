import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text1: { type: String, required: true },
  highlight: { type: String, required: true },
  text2: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Quote', quoteSchema);
