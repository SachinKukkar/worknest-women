import { useState, useEffect } from 'react';
import { getFinancialSummary, getTransactions, addTransaction } from '../services/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, TrendingDown, PiggyBank, Plus, X, IndianRupee } from 'lucide-react';

const COLORS = ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#be123c', '#9f1239'];
const PIE_COLORS = ['#10b981', '#f43f5e', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6'];

function AddTransactionModal({ onClose, onAdded }) {
  const [form, setForm] = useState({ type: 'income', amount: '', category: '', description: '' });
  const [saving, setSaving] = useState(false);

  const categories = form.type === 'income'
    ? ['Graphic Design', 'Content Writing', 'Digital Marketing', 'Data Entry', 'Teaching', 'Tailoring', 'Beauty', 'Other']
    : ['Tools & Software', 'Internet', 'Training', 'Transport', 'Food', 'Utilities', 'Other'];

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await addTransaction({ ...form, amount: Number(form.amount) });
      onAdded();
      onClose();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-gray-800">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setForm({ ...form, type: 'income' })}
              className={`py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${form.type === 'income' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500'}`}>
              💰 Income
            </button>
            <button type="button" onClick={() => setForm({ ...form, type: 'expense' })}
              className={`py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${form.type === 'expense' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-500'}`}>
              💸 Expense
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (₹)</label>
            <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
              placeholder="5000" className="input" required min="1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input" required>
              <option value="">Select category</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Brief note..." className="input" />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={saving} className="btn-primary flex-1 flex justify-center items-center gap-2 disabled:opacity-60">
              {saving ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : 'Save Transaction'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary px-4">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FinancialDashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([getFinancialSummary(), getTransactions({ limit: 10 })])
      .then(([sRes, tRes]) => {
        setSummary(sRes.data.summary);
        setTransactions(tRes.data.transactions);
      }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const fmt = n => `₹${(n || 0).toLocaleString('en-IN')}`;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    </div>
  );

  const savingsPct = summary?.totalIncome > 0
    ? Math.round((summary.savings / summary.totalIncome) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} onAdded={load} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">Financial Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Track your earnings, expenses & savings</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card border-l-4 border-emerald-400">
          <div className="flex items-center gap-2 text-emerald-600">
            <TrendingUp size={18} /> <span className="text-sm font-medium">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{fmt(summary?.totalIncome)}</p>
          <p className="text-xs text-gray-400">All earnings recorded</p>
        </div>
        <div className="stat-card border-l-4 border-rose-400">
          <div className="flex items-center gap-2 text-rose-600">
            <TrendingDown size={18} /> <span className="text-sm font-medium">Total Expenses</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{fmt(summary?.totalExpense)}</p>
          <p className="text-xs text-gray-400">All expenses recorded</p>
        </div>
        <div className="stat-card border-l-4 border-blue-400">
          <div className="flex items-center gap-2 text-blue-600">
            <PiggyBank size={18} /> <span className="text-sm font-medium">Net Savings</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{fmt(summary?.savings)}</p>
          <p className="text-xs text-gray-400">{savingsPct}% savings rate</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly bar chart */}
        <div className="card">
          <h2 className="font-semibold text-gray-700 mb-4">Monthly Income vs Expenses</h2>
          {summary?.monthly?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={summary.monthly} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, '']} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-400 text-sm text-center py-12">No data yet</p>}
        </div>

        {/* Category pie chart */}
        <div className="card">
          <h2 className="font-semibold text-gray-700 mb-4">Income by Category</h2>
          {summary?.categoryBreakdown?.length > 0 ? (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie data={summary.categoryBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                    dataKey="value" paddingAngle={3}>
                    {summary.categoryBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={v => `₹${v.toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {summary.categoryBreakdown.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-gray-600 truncate">{item.name}</span>
                    <span className="text-gray-400 ml-auto">₹{(item.value/1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
            </div>
          ) : <p className="text-gray-400 text-sm text-center py-12">No data yet</p>}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card">
        <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Recent Transactions</h2>
        {transactions.length === 0 ? (
          <div className="text-center py-10">
            <IndianRupee size={32} className="mx-auto text-gray-200 mb-2" />
            <p className="text-gray-400 text-sm">No transactions yet. Add your first one!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map(tx => (
              <div key={tx._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {tx.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{tx.description || tx.category}</p>
                  <p className="text-xs text-gray-400">{tx.category} · {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                </div>
                <p className={`text-sm font-bold flex-shrink-0 ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
