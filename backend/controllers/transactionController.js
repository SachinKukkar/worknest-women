const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const { type, limit = 20 } = req.query;
    const filter = { user: req.user._id };
    if (type) filter.type = type;
    const transactions = await Transaction.find(filter).sort({ date: -1 }).limit(Number(limit));
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const all = await Transaction.find({ user: req.user._id });
    const income = all.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = all.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    // Monthly breakdown for chart
    const monthly = {};
    all.forEach(t => {
      const key = new Date(t.date).toLocaleString('default', { month: 'short', year: '2-digit' });
      if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };
      monthly[key][t.type] += t.amount;
    });

    const categoryBreakdown = {};
    all.filter(t => t.type === 'income').forEach(t => {
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount;
    });

    res.json({
      success: true,
      summary: {
        totalIncome: income,
        totalExpense: expense,
        savings: income - expense,
        monthly: Object.entries(monthly).map(([month, data]) => ({ month, ...data })),
        categoryBreakdown: Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value }))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
