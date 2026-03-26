const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  icon: { type: String, default: '🌟' },
  description: { type: String },
  demandLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  avgPay: { type: Number, default: 0 }
});

module.exports = mongoose.model('Skill', skillSchema);
