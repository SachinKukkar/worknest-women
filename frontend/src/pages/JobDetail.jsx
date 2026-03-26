import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getJob, applyJob } from '../services/api';
import { MapPin, Clock, IndianRupee, ArrowLeft, CheckCircle, Briefcase, Building } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getJob(id).then(res => setJob(res.data.job))
      .catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleApply = async e => {
    e.preventDefault();
    if (!coverLetter.trim()) return setError('Please write a short cover letter.');
    setApplying(true);
    setError('');
    try {
      await applyJob({ jobId: id, coverLetter });
      setApplied(true);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Application failed.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    </div>
  );

  if (!job) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Job not found.</p>
      <Link to="/jobs" className="btn-primary inline-block mt-4">Browse Jobs</Link>
    </div>
  );

  const typeColors = { remote: 'bg-emerald-100 text-emerald-700', freelance: 'bg-blue-100 text-blue-700', onsite: 'bg-orange-100 text-orange-700', hybrid: 'bg-violet-100 text-violet-700' };

  return (
    <div className="max-w-3xl space-y-5">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition-colors">
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      {/* Header card */}
      <div className="card">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {job.company[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-xl md:text-2xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-gray-500 flex items-center gap-1.5 mt-1 text-sm">
              <Building size={14} /> {job.company}
            </p>
          </div>
          <span className={`badge ${typeColors[job.type] || 'bg-gray-100 text-gray-600'} capitalize flex-shrink-0`}>{job.type}</span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-5">
          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-rose-400" /> {job.location || 'Remote'}</span>
          <span className="flex items-center gap-1.5"><IndianRupee size={14} className="text-emerald-500" />
            {job.salary?.min?.toLocaleString('en-IN')}–{job.salary?.max?.toLocaleString('en-IN')} / {job.salary?.period}
          </span>
          <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-blue-400" /> {job.category}</span>
        </div>

        {job.isWomenOnly && (
          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            👩 Women preferred
          </div>
        )}

        {/* Skills required */}
        {job.skills?.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills Required</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(s => (
                <span key={s._id} className="badge bg-rose-50 text-rose-700 border border-rose-200">{s.icon} {s.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {applied ? (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 font-medium px-5 py-3 rounded-xl">
            <CheckCircle size={18} /> Application submitted! We'll notify you of updates.
          </div>
        ) : showForm ? null : (
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
            <Briefcase size={16} /> Apply for this Job
          </button>
        )}
      </div>

      {/* Apply form */}
      {showForm && !applied && (
        <div className="card border-rose-200 border-2">
          <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Write a Cover Letter</h2>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-xl mb-4">{error}</div>}
          <form onSubmit={handleApply} className="space-y-4">
            <textarea
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
              placeholder="Tell us why you're a great fit for this role. Share your relevant experience, skills, and enthusiasm..."
              rows={5}
              className="input resize-none"
              required
            />
            <div className="flex gap-3">
              <button type="submit" disabled={applying} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                {applying ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <CheckCircle size={16} />}
                Submit Application
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Description */}
      <div className="card">
        <h2 className="font-display text-lg font-bold text-gray-800 mb-3">About this Role</h2>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
      </div>

      {/* Requirements */}
      {job.requirements?.length > 0 && (
        <div className="card">
          <h2 className="font-display text-lg font-bold text-gray-800 mb-3">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" /> {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {job.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
