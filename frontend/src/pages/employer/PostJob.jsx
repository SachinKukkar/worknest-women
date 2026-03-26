import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../services/api';
import { PlusCircle, X, Briefcase } from 'lucide-react';

const CATEGORIES = ['Design', 'Writing', 'Education', 'Food', 'Data', 'Marketing', 'Beauty', 'Handcraft', 'Technology', 'Finance', 'Wellness', 'Other'];
const TYPES = ['remote', 'onsite', 'hybrid', 'freelance'];
const PERIODS = ['hourly', 'daily', 'monthly', 'project'];

export default function PostJob() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [reqInput, setReqInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [form, setForm] = useState({
    title: '', company: '', description: '',
    requirements: [], tags: [],
    type: 'remote', category: 'Design',
    salaryMin: '', salaryMax: '', period: 'monthly',
    location: '', isWomenOnly: true,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addReq = () => {
    const v = reqInput.trim();
    if (v && !form.requirements.includes(v)) set('requirements', [...form.requirements, v]);
    setReqInput('');
  };

  const addTag = () => {
    const v = tagInput.trim().toLowerCase();
    if (v && !form.tags.includes(v)) set('tags', [...form.tags, v]);
    setTagInput('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await createJob({
        title: form.title, company: form.company, description: form.description,
        requirements: form.requirements, tags: form.tags,
        type: form.type, category: form.category,
        salary: { min: Number(form.salaryMin), max: Number(form.salaryMax), currency: 'INR', period: form.period },
        location: form.location, isWomenOnly: form.isWomenOnly,
      });
      navigate('/employer/jobs');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200';

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">Post a New Job</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details to attract the right candidates</p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5">
        {/* Basic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <input required value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="e.g. Graphic Designer" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input required value={form.company} onChange={e => set('company', e.target.value)}
              placeholder="e.g. Creative Studio" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea required rows={4} value={form.description} onChange={e => set('description', e.target.value)}
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            className={inputCls + ' resize-none'} />
        </div>

        {/* Type / Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)} className={inputCls}>
              {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary (₹)</label>
            <input type="number" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)}
              placeholder="10000" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary (₹)</label>
            <input type="number" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)}
              placeholder="25000" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <select value={form.period} onChange={e => set('period', e.target.value)} className={inputCls}>
              {PERIODS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input value={form.location} onChange={e => set('location', e.target.value)}
            placeholder="e.g. Remote / Mumbai / Jaipur" className={inputCls} />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
          <div className="flex gap-2">
            <input value={reqInput} onChange={e => setReqInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addReq())}
              placeholder="Type a requirement and press Enter" className={inputCls} />
            <button type="button" onClick={addReq} className="btn-primary px-4 py-2 text-sm">Add</button>
          </div>
          {form.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.requirements.map(r => (
                <span key={r} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {r}
                  <button type="button" onClick={() => set('requirements', form.requirements.filter(x => x !== r))}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex gap-2">
            <input value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="e.g. remote, design, flexible" className={inputCls} />
            <button type="button" onClick={addTag} className="btn-primary px-4 py-2 text-sm">Add</button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.tags.map(t => (
                <span key={t} className="flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-medium">
                  #{t}
                  <button type="button" onClick={() => set('tags', form.tags.filter(x => x !== t))}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Women only toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <div className={`relative w-11 h-6 rounded-full transition-colors ${form.isWomenOnly ? 'bg-rose-500' : 'bg-gray-200'}`}
            onClick={() => set('isWomenOnly', !form.isWomenOnly)}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isWomenOnly ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm font-medium text-gray-700">Women-only listing 🌸</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate('/employer/jobs')}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
            {saving
              ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <><Briefcase size={16} /> Post Job</>}
          </button>
        </div>
      </form>
    </div>
  );
}
