const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [String],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  type: { type: String, enum: ['remote', 'onsite', 'hybrid', 'freelance'], default: 'remote' },
  category: { type: String, required: true },
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'INR' },
    period: { type: String, enum: ['hourly', 'daily', 'monthly', 'project'], default: 'monthly' }
  },
  location: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['open', 'closed', 'filled'], default: 'open' },
  isWomenOnly: { type: Boolean, default: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
