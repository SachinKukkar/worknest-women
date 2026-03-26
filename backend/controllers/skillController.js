const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json({ success: true, skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, skill });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsertSkill = async (req, res) => {
  try {
    const { name, category, icon, demandLevel, avgPay, description } = req.body;
    let skill = await Skill.findOne({ name });
    if (!skill) {
      skill = await Skill.create({ name, category, icon: icon || '🔧', demandLevel: demandLevel || 'Medium', avgPay: avgPay || 0, description: description || '' });
    }
    res.json({ success: true, skill });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
