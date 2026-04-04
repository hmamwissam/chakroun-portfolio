import mongoose from 'mongoose';

const DegreeSchema = new mongoose.Schema({
  title: String,
  org: String,
  note: String,
  current: Boolean,
  order: Number
});

const CertSchema = new mongoose.Schema({
  title: String,
  org: String,
  order: Number
});

const EducationSchema = new mongoose.Schema({
  degrees: [DegreeSchema],
  certs: [CertSchema],
  languages: [{ type: String }],
  interests: [{ type: String }]
});

export default mongoose.model('Education', EducationSchema);
