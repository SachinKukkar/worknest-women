import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import { User, MapPin, Phone, Mail, Save, CheckCircle, Briefcase } from 'lucide-react';

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateProfile(form);
      await refreshUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  const roleColor = { woman: 'bg-rose-100 text-rose-700', employer: 'bg-blue-100 text-blue-700', admin: 'bg-violet-100 text-violet-700' };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information and account settings</p>
      </div>

      {/* Profile card */}
      <div className="card flex items-center gap-5">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
            <Mail size={13} /> {user?.email}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`badge capitalize ${roleColor[user?.role] || 'bg-gray-100 text-gray-600'}`}>
              {user?.role}
            </span>
            {user?.skills?.length > 0 && (
              <span className="badge bg-rose-50 text-rose-600">
                {user.skills.length} skill{user.skills.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="card">
        <h2 className="font-semibold text-gray-700 mb-5 flex items-center gap-2"><User size={18} className="text-rose-400" /> Personal Information</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="phone" value={form.phone} onChange={handleChange} className="input pl-10" placeholder="9876543210" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="location" value={form.location} onChange={handleChange} className="input pl-10" placeholder="City, State" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange}
              className="input resize-none" rows={4}
              placeholder="Tell employers a little about yourself, your experience, and what you're looking for..." />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button type="submit" disabled={saving || saved}
              className="btn-primary flex items-center gap-2 disabled:opacity-60">
              {saved ? <><CheckCircle size={16} /> Saved!</> :
               saving ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> :
               <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>

      {/* Skills summary */}
      {user?.skills?.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Briefcase size={18} className="text-rose-400" /> My Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map(s => (
              <span key={s._id || s} className="badge bg-rose-50 text-rose-700 border border-rose-200 text-sm py-1.5">
                {s.icon || '🌟'} {s.name || 'Skill'}
              </span>
            ))}
          </div>
          <a href="/skills" className="text-sm text-rose-600 font-medium hover:underline mt-3 inline-block">
            + Update skills →
          </a>
        </div>
      )}

      {/* Account info */}
      <div className="card">
        <h2 className="font-semibold text-gray-700 mb-4">Account Info</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Member since</span>
            <span className="font-medium">{new Date(user?.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Account type</span>
            <span className="font-medium capitalize">{user?.role}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
