import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSkills, addSkills, upsertSkill } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Star, ArrowRight, Search, X } from 'lucide-react';

const CATEGORIES = ['All', 'Digital', 'Handcraft', 'Food', 'Education', 'Beauty', 'Technology', 'Language', 'Wellness', 'Creative', 'Finance'];

// Expanded local skill suggestions per category
const LOCAL_SKILLS = {
  Digital: [
    { name: 'Data Entry', icon: '💻', demandLevel: 'High', avgPay: 15000 },
    { name: 'Graphic Design', icon: '🎨', demandLevel: 'High', avgPay: 22000 },
    { name: 'Content Writing', icon: '✍️', demandLevel: 'High', avgPay: 18000 },
    { name: 'Digital Marketing', icon: '📱', demandLevel: 'High', avgPay: 25000 },
    { name: 'Customer Support', icon: '🎧', demandLevel: 'High', avgPay: 14000 },
    { name: 'Social Media Management', icon: '📲', demandLevel: 'High', avgPay: 20000 },
    { name: 'SEO & SEM', icon: '🔍', demandLevel: 'High', avgPay: 22000 },
    { name: 'Email Marketing', icon: '📧', demandLevel: 'Medium', avgPay: 18000 },
    { name: 'Video Editing', icon: '🎬', demandLevel: 'High', avgPay: 24000 },
    { name: 'UI/UX Design', icon: '🖌️', demandLevel: 'High', avgPay: 30000 },
    { name: 'Canva Design', icon: '🖼️', demandLevel: 'High', avgPay: 16000 },
    { name: 'Copywriting', icon: '📝', demandLevel: 'High', avgPay: 20000 },
    { name: 'Virtual Assistant', icon: '🗂️', demandLevel: 'High', avgPay: 17000 },
    { name: 'Online Research', icon: '🔎', demandLevel: 'Medium', avgPay: 13000 },
    { name: 'Transcription', icon: '🎙️', demandLevel: 'Medium', avgPay: 14000 },
  ],
  Technology: [
    { name: 'Web Development', icon: '🌐', demandLevel: 'High', avgPay: 35000 },
    { name: 'Python Programming', icon: '🐍', demandLevel: 'High', avgPay: 40000 },
    { name: 'JavaScript', icon: '⚡', demandLevel: 'High', avgPay: 38000 },
    { name: 'React.js', icon: '⚛️', demandLevel: 'High', avgPay: 42000 },
    { name: 'WordPress Development', icon: '🔧', demandLevel: 'High', avgPay: 25000 },
    { name: 'App Development', icon: '📱', demandLevel: 'High', avgPay: 45000 },
    { name: 'Database Management', icon: '🗄️', demandLevel: 'Medium', avgPay: 30000 },
    { name: 'Cybersecurity', icon: '🔐', demandLevel: 'High', avgPay: 50000 },
    { name: 'Cloud Computing', icon: '☁️', demandLevel: 'High', avgPay: 48000 },
    { name: 'Machine Learning', icon: '🤖', demandLevel: 'High', avgPay: 55000 },
    { name: 'Data Analysis', icon: '📊', demandLevel: 'High', avgPay: 35000 },
    { name: 'IT Support', icon: '🖥️', demandLevel: 'Medium', avgPay: 20000 },
  ],
  Handcraft: [
    { name: 'Tailoring & Stitching', icon: '🧵', demandLevel: 'High', avgPay: 12000 },
    { name: 'Handicrafts', icon: '🪡', demandLevel: 'Medium', avgPay: 10000 },
    { name: 'Embroidery', icon: '🌸', demandLevel: 'Medium', avgPay: 11000 },
    { name: 'Knitting & Crochet', icon: '🧶', demandLevel: 'Medium', avgPay: 9000 },
    { name: 'Jewellery Making', icon: '💍', demandLevel: 'Medium', avgPay: 13000 },
    { name: 'Pottery & Ceramics', icon: '🏺', demandLevel: 'Low', avgPay: 10000 },
    { name: 'Candle Making', icon: '🕯️', demandLevel: 'Medium', avgPay: 9000 },
    { name: 'Bag & Purse Making', icon: '👜', demandLevel: 'Medium', avgPay: 11000 },
    { name: 'Block Printing', icon: '🖨️', demandLevel: 'Low', avgPay: 10000 },
    { name: 'Weaving', icon: '🪢', demandLevel: 'Medium', avgPay: 12000 },
    { name: 'Macramé', icon: '🪢', demandLevel: 'Low', avgPay: 9000 },
    { name: 'Soap Making', icon: '🧼', demandLevel: 'Medium', avgPay: 10000 },
  ],
  Food: [
    { name: 'Cooking & Catering', icon: '🍳', demandLevel: 'Medium', avgPay: 14000 },
    { name: 'Baking & Confectionery', icon: '🎂', demandLevel: 'High', avgPay: 16000 },
    { name: 'Tiffin Service', icon: '🍱', demandLevel: 'High', avgPay: 15000 },
    { name: 'Pickle & Preserve Making', icon: '🫙', demandLevel: 'Medium', avgPay: 10000 },
    { name: 'Cake Decoration', icon: '🍰', demandLevel: 'High', avgPay: 18000 },
    { name: 'Chocolate Making', icon: '🍫', demandLevel: 'Medium', avgPay: 14000 },
    { name: 'Healthy Meal Prep', icon: '🥗', demandLevel: 'High', avgPay: 16000 },
    { name: 'Street Food Vending', icon: '🌮', demandLevel: 'Medium', avgPay: 12000 },
    { name: 'Jam & Jelly Making', icon: '🍓', demandLevel: 'Low', avgPay: 9000 },
    { name: 'Papad & Snack Making', icon: '🥨', demandLevel: 'Medium', avgPay: 10000 },
  ],
  Education: [
    { name: 'Teaching & Tutoring', icon: '📚', demandLevel: 'High', avgPay: 20000 },
    { name: 'Online Teaching', icon: '💻', demandLevel: 'High', avgPay: 22000 },
    { name: 'Preschool Teaching', icon: '🧒', demandLevel: 'High', avgPay: 18000 },
    { name: 'Special Education', icon: '🌟', demandLevel: 'High', avgPay: 22000 },
    { name: 'Music Teaching', icon: '🎵', demandLevel: 'Medium', avgPay: 18000 },
    { name: 'Dance Teaching', icon: '💃', demandLevel: 'Medium', avgPay: 17000 },
    { name: 'Art & Craft Teaching', icon: '🎨', demandLevel: 'Medium', avgPay: 16000 },
    { name: 'Spoken English Coaching', icon: '🗣️', demandLevel: 'High', avgPay: 20000 },
    { name: 'Competitive Exam Coaching', icon: '📝', demandLevel: 'High', avgPay: 25000 },
    { name: 'Montessori Training', icon: '🏫', demandLevel: 'Medium', avgPay: 19000 },
  ],
  Beauty: [
    { name: 'Beauty & Makeup', icon: '💄', demandLevel: 'High', avgPay: 16000 },
    { name: 'Bridal Makeup', icon: '👰', demandLevel: 'High', avgPay: 25000 },
    { name: 'Hair Styling', icon: '💇', demandLevel: 'High', avgPay: 18000 },
    { name: 'Nail Art', icon: '💅', demandLevel: 'High', avgPay: 15000 },
    { name: 'Skincare & Facials', icon: '✨', demandLevel: 'High', avgPay: 17000 },
    { name: 'Mehendi / Henna', icon: '🌿', demandLevel: 'High', avgPay: 14000 },
    { name: 'Eyebrow Threading', icon: '🪡', demandLevel: 'Medium', avgPay: 12000 },
    { name: 'Waxing & Hair Removal', icon: '🌸', demandLevel: 'Medium', avgPay: 13000 },
    { name: 'Eyelash Extensions', icon: '👁️', demandLevel: 'Medium', avgPay: 16000 },
    { name: 'Spa & Massage Therapy', icon: '🧖', demandLevel: 'Medium', avgPay: 18000 },
  ],
  Language: [
    { name: 'Translation', icon: '🗣️', demandLevel: 'Medium', avgPay: 17000 },
    { name: 'Hindi Content Writing', icon: '📝', demandLevel: 'High', avgPay: 16000 },
    { name: 'English Proofreading', icon: '✅', demandLevel: 'High', avgPay: 18000 },
    { name: 'Subtitling & Captioning', icon: '🎬', demandLevel: 'Medium', avgPay: 15000 },
    { name: 'Interpretation Services', icon: '🌐', demandLevel: 'Medium', avgPay: 20000 },
    { name: 'Language Tutoring', icon: '📚', demandLevel: 'High', avgPay: 18000 },
    { name: 'Localization', icon: '🗺️', demandLevel: 'Medium', avgPay: 22000 },
    { name: 'Voice Over', icon: '🎙️', demandLevel: 'Medium', avgPay: 20000 },
  ],
  Wellness: [
    { name: 'Yoga & Fitness', icon: '🧘', demandLevel: 'Medium', avgPay: 18000 },
    { name: 'Personal Training', icon: '🏋️', demandLevel: 'High', avgPay: 22000 },
    { name: 'Nutrition Counselling', icon: '🥦', demandLevel: 'High', avgPay: 20000 },
    { name: 'Meditation Coaching', icon: '🧠', demandLevel: 'Medium', avgPay: 17000 },
    { name: 'Zumba Instructor', icon: '💃', demandLevel: 'Medium', avgPay: 18000 },
    { name: 'Ayurvedic Therapy', icon: '🌿', demandLevel: 'Medium', avgPay: 16000 },
    { name: 'Mental Health Counselling', icon: '💙', demandLevel: 'High', avgPay: 25000 },
    { name: 'Childcare & Babysitting', icon: '👶', demandLevel: 'High', avgPay: 15000 },
    { name: 'Elderly Care', icon: '🧓', demandLevel: 'High', avgPay: 16000 },
  ],
  Creative: [
    { name: 'Photography', icon: '📸', demandLevel: 'Medium', avgPay: 20000 },
    { name: 'Videography', icon: '🎥', demandLevel: 'Medium', avgPay: 22000 },
    { name: 'Illustration', icon: '🖼️', demandLevel: 'Medium', avgPay: 20000 },
    { name: 'Fashion Design', icon: '👗', demandLevel: 'Medium', avgPay: 22000 },
    { name: 'Interior Design', icon: '🏠', demandLevel: 'Medium', avgPay: 25000 },
    { name: 'Painting & Art', icon: '🎨', demandLevel: 'Low', avgPay: 15000 },
    { name: 'Calligraphy', icon: '✒️', demandLevel: 'Low', avgPay: 12000 },
    { name: 'Music Production', icon: '🎵', demandLevel: 'Medium', avgPay: 20000 },
    { name: 'Podcast Production', icon: '🎙️', demandLevel: 'Medium', avgPay: 18000 },
    { name: 'Resin Art', icon: '💎', demandLevel: 'Medium', avgPay: 14000 },
  ],
  Finance: [
    { name: 'Accounting', icon: '📊', demandLevel: 'High', avgPay: 28000 },
    { name: 'Bookkeeping', icon: '📒', demandLevel: 'High', avgPay: 22000 },
    { name: 'Tax Filing & GST', icon: '🧾', demandLevel: 'High', avgPay: 25000 },
    { name: 'Financial Planning', icon: '💰', demandLevel: 'High', avgPay: 30000 },
    { name: 'Tally & ERP', icon: '🖥️', demandLevel: 'High', avgPay: 20000 },
    { name: 'Payroll Management', icon: '💳', demandLevel: 'Medium', avgPay: 22000 },
    { name: 'Insurance Advisory', icon: '🛡️', demandLevel: 'Medium', avgPay: 25000 },
    { name: 'Mutual Fund Advisory', icon: '📈', demandLevel: 'Medium', avgPay: 28000 },
    { name: 'Loan Processing', icon: '🏦', demandLevel: 'Medium', avgPay: 20000 },
  ],
};

// Flatten all local skills with category attached
const ALL_LOCAL_SKILLS = Object.entries(LOCAL_SKILLS).flatMap(([category, skills]) =>
  skills.map(s => ({ ...s, category }))
);

export default function SkillSelection() {
  const [dbSkills, setDbSkills] = useState([]);
  const [selected, setSelected] = useState([]); // array of { name, category, icon, demandLevel, avgPay, _id? }
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getSkills().then(res => {
      setDbSkills(res.data.skills);
      if (user?.skills?.length) {
        // Pre-select by matching names from DB skills
        const userSkillIds = user.skills.map(s => s._id || s);
        const preSelected = res.data.skills
          .filter(s => userSkillIds.includes(s._id))
          .map(s => ({ name: s.name, category: s.category, icon: s.icon, demandLevel: s.demandLevel, avgPay: s.avgPay, _id: s._id }));
        setSelected(preSelected);
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  // Merge DB skills into local list (DB skills take priority for same name)
  const mergedSkills = useMemo(() => {
    const dbByName = Object.fromEntries(dbSkills.map(s => [s.name, s]));
    return ALL_LOCAL_SKILLS.map(local => dbByName[local.name]
      ? { ...local, _id: dbByName[local.name]._id }
      : local
    );
  }, [dbSkills]);

  const displaySkills = useMemo(() => {
    let list = activeCategory === 'All' ? mergedSkills : mergedSkills.filter(s => s.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = mergedSkills.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    }
    return list;
  }, [mergedSkills, activeCategory, search]);

  const isSelected = (name) => selected.some(s => s.name === name);

  const toggle = (skill) => {
    setSelected(prev =>
      prev.some(s => s.name === skill.name)
        ? prev.filter(s => s.name !== skill.name)
        : [...prev, skill]
    );
  };

  const handleSave = async () => {
    if (!selected.length) return;
    setSaving(true);
    try {
      // Upsert all selected skills to get their DB _ids
      const resolved = await Promise.all(
        selected.map(skill =>
          skill._id
            ? Promise.resolve(skill._id)
            : upsertSkill({ name: skill.name, category: skill.category, icon: skill.icon, demandLevel: skill.demandLevel, avgPay: skill.avgPay })
                .then(res => res.data.skill._id)
        )
      );
      await addSkills(resolved);
      await refreshUser();
      setSaved(true);
      setTimeout(() => navigate('/jobs'), 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">Select Your Skills</h1>
        <p className="text-gray-500 text-sm mt-1">
          Choose all skills you have. We'll match you with the best jobs.{' '}
          <span className="text-rose-600 font-medium">{selected.length} selected</span>
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={e => { setSearch(e.target.value); setActiveCategory('All'); }}
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category filter */}
      {!search && (
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map(skill => (
            <span key={skill.name} className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
              {skill.icon} {skill.name}
              <button onClick={() => toggle(skill)} className="hover:text-rose-900"><X size={12} /></button>
            </span>
          ))}
        </div>
      )}

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displaySkills.map(skill => {
          const sel = isSelected(skill.name);
          return (
            <button key={skill.name} onClick={() => toggle(skill)}
              className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                sel
                  ? 'border-rose-500 bg-rose-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50/40'
              }`}>
              {sel && <CheckCircle size={18} className="absolute top-3 right-3 text-rose-500" />}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{skill.icon}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm leading-snug">{skill.name}</p>
                  <p className="text-xs text-gray-400">{skill.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className={`badge text-xs ${
                  skill.demandLevel === 'High' ? 'bg-emerald-100 text-emerald-700' :
                  skill.demandLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {skill.demandLevel} demand
                </span>
                {skill.avgPay > 0 && (
                  <span className="text-xs text-rose-600 font-medium">
                    Avg ₹{skill.avgPay.toLocaleString('en-IN')}/mo
                  </span>
                )}
              </div>
            </button>
          );
        })}
        {displaySkills.length === 0 && (
          <p className="col-span-3 text-center text-gray-400 py-10 text-sm">No skills found for "{search}"</p>
        )}
      </div>

      {/* Save */}
      <div className="sticky bottom-4">
        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-4 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            {selected.length === 0
              ? 'Select at least one skill to continue'
              : `${selected.length} skill${selected.length > 1 ? 's' : ''} selected`}
          </p>
          <button onClick={handleSave} disabled={!selected.length || saving || saved}
            className="btn-primary flex items-center gap-2 disabled:opacity-60">
            {saved ? <><CheckCircle size={16} /> Saved!</> :
             saving ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> :
             <><Star size={16} /> Save Skills <ArrowRight size={16} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
