import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplications } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FileText, Clock, CheckCircle, XCircle, Eye, Briefcase } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', icon: Clock },
  reviewed: { label: 'Reviewed', color: 'bg-blue-100 text-blue-700', icon: Eye },
  accepted: { label: 'Accepted', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-600', icon: XCircle },
};

function ApplicationCard({ app }) {
  const cfg = statusConfig[app.status] || statusConfig.pending;
  const StatusIcon = cfg.icon;
  const date = new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="card flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-11 h-11 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
        {app.job?.company?.[0] || 'J'}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{app.job?.title}</h3>
        <p className="text-sm text-gray-500">{app.job?.company} · {app.job?.type}</p>
        <p className="text-xs text-gray-400 mt-1">Applied on {date}</p>
        {app.coverLetter && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">"{app.coverLetter}"</p>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className={`badge ${cfg.color} flex items-center gap-1`}>
          <StatusIcon size={12} /> {cfg.label}
        </span>
        <Link to={`/jobs/${app.job?._id}`} className="text-rose-600 hover:text-rose-800 transition-colors">
          <Eye size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError('');
    getMyApplications()
      .then(res => {
        setApplications(res.data.applications || []);
      })
      .catch(err => {
        console.error('Failed to load applications:', err);
        setError('Failed to load applications. Please refresh the page.');
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const counts = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading applications...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Track the status of all your job applications</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: 'all', label: 'Total', color: 'border-rose-200 bg-rose-50' },
          { key: 'pending', label: 'Pending', color: 'border-amber-200 bg-amber-50' },
          { key: 'accepted', label: 'Accepted', color: 'border-emerald-200 bg-emerald-50' },
          { key: 'rejected', label: 'Rejected', color: 'border-red-200 bg-red-50' },
        ].map(item => (
          <button key={item.key} onClick={() => setFilter(item.key)}
            className={`p-3 rounded-2xl border-2 text-center transition-all ${item.color} ${filter === item.key ? 'shadow-sm scale-105' : 'opacity-70'}`}>
            <p className="text-xl font-bold text-gray-800">{counts[item.key]}</p>
            <p className="text-xs text-gray-500 font-medium">{item.label}</p>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <FileText size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 mb-4">No applications found.</p>
          <Link to="/jobs" className="btn-primary inline-flex items-center gap-2">
            <Briefcase size={16} /> Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(app => <ApplicationCard key={app._id} app={app} />)}
        </div>
      )}
    </div>
  );
}
