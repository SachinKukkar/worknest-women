const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, location, bio, skills } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, location, bio, skills },
      { new: true }
    ).populate('skills');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addSkills = async (req, res) => {
  try {
    const { skillIds } = req.body;
    if (!Array.isArray(skillIds)) {
      return res.status(400).json({ success: false, message: 'skillIds must be an array' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { skills: skillIds },
      { new: true }
    ).populate('skills');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const Transaction = require('../models/Transaction');
    const Application = require('../models/Application');

    const transactions = await Transaction.find({ user: req.user._id });
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const applications = await Application.find({ applicant: req.user._id });

    res.json({
      success: true,
      stats: {
        totalEarnings: totalIncome,
        totalExpenses: totalExpense,
        savings: totalIncome - totalExpense,
        totalApplications: applications.length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        pending: applications.filter(a => a.status === 'pending').length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
