import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMyJobs, getJobApplications, updateApplicationStatus } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Users, ChevronDown, X, Calendar, MessageSquare, CheckCircle, XCircle, Eye, Clock, Search } from 'lucide-react';

const STATUS_CONFIG = {
  pending:  { label: 'Pending',  color: 'bg-gray-100 text-gray-600' },
  reviewed: { label: 'Reviewed', color: 'bg-blue-100 text-blue-700' },
  interview:{ label: 'Interview',color: 'bg-amber-100 text-amber-700' },
  accepted: { label: 'Hired',    color: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-600' },
};

const PIPELINE = ['pending', 'reviewed', 'interview', 'accepted', 'rejected'];

function CandidateDrawer({ app, onClose, onUpdate }) {
  const [status, setStatus] = useState(app.status);
  const [interviewDate, setInterviewDate] = useState(app.interviewDate ? app.interviewDate.slice(0, 16) : '');
  const [notes, setNotes] = useState(app.notes || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const payload = { status };
      if (status === 'interview' && interviewDate) payload.interviewDate = interviewDate;
      if (notes !== undefined) payload.notes = notes;
      const res = await updateApplicationStatus(app._id, payload);
      onUpdate(res.data.application);
      onClose();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const a = app.applicant;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-gray-800">Candidate Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="flex-1 p-6 space-y-5">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 font-bold text-xl">
              {a?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-lg">{a?.name}</p>
              <p className="text-sm text-gray-500">{a?.email}</p>
              {a?.phone && <p className="text-sm text-gray-500">{a?.phone}</p>}
              {a?.location && <p className="text-xs text-gray-400 mt-0.5">📍 {a?.location}</p>}
            </div>
          </div>

          {/* Bio */}
          {a?.bio && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">About</p>
              <p className="text-sm text-gray-700">{a.bio}</p>
            </div>
          )}

          {/* Skills */}
          {a?.skills?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {a.skills.map(s => (
                  <span key={s._id || s.name} className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-medium">
                    {s.icon} {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cover letter */}
          {app.coverLetter && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cover Letter</p>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{app.coverLetter}</p>
              </div>
            </div>
          )}

          {/* Applied date */}
          <p className="text-xs text-gray-400">
            Applied {new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Update Status</p>
            <div className="grid grid-cols-3 gap-2">
              {PIPELINE.map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`py-2 rounded-xl text-xs font-medium border-2 transition-all ${
                    status === s ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-500 hover:border-rose-200'
                  }`}>
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Interview date */}
          {status === 'interview' && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                <Calendar size={12} className="inline mr-1" />Interview Date & Time
              </label>
              <input type="datetime-local" value={interviewDate} onChange={e => setInterviewDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400" />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              <MessageSquare size={12} className="inline mr-1" />Internal Notes
            </label>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Add private notes about this candidate..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400 resize-none" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={save} disabled={saving}
            className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
            {saving
              ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <><CheckCircle size={16} /> Save</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EmployerCandidates() {
  const [searchParams] = useSearchParams();
  const preselectedJob = searchParams.get('job');
  const { isAuthenticated } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [drawerApp, setDrawerApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');
  const [appsLoading, setAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setJobsError('');
    getMyJobs().then(res => {
      const myJobs = res.data.jobs;
      setJobs(myJobs);
      const initial = preselectedJob
        ? myJobs.find(j => j._id === preselectedJob) || myJobs[0]
        : myJobs[0];
      if (initial) setSelectedJob(initial);
    }).catch(err => {
      console.error('Failed to load jobs:', err);
      setJobsError('Failed to load your jobs. Please refresh the page.');
    }).finally(() => setLoading(false));
  }, [isAuthenticated, preselectedJob]);

  useEffect(() => {
    if (!selectedJob) return;
    setAppsLoading(true);
    setAppsError('');
    getJobApplications(selectedJob._id)
      .then(res => setApplications(res.data.applications))
      .catch(err => {
        console.error('Failed to load applications:', err);
        setAppsError('Failed to load candidates. Please try again.');
      })
      .finally(() => setAppsLoading(false));
  }, [selectedJob]);

  const handleUpdate = (updated) => {
    setApplications(prev => prev.map(a => a._id === updated._id ? { ...a, ...updated } : a));
  };

  const filtered = applications.filter(a => {
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchSearch = !search || a.applicant?.name?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">Candidates</h1>
        <p className="text-gray-500 text-sm mt-1">Review and manage applicants for your jobs</p>
      </div>

      {jobsError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {jobsError}
        </div>
      )}

      {jobs.length === 0 && !loading && (
        <div className="card text-center py-14">
          <Users size={36} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 text-sm">No jobs posted yet</p>
          <p className="text-gray-400 text-xs mt-1">Start by posting your first job</p>
        </div>
      )}

      {jobs.length > 0 && (
      <>
      {/* Job selector */}
      <div className="relative max-w-sm">
        <select value={selectedJob?._id || ''} onChange={e => setSelectedJob(jobs.find(j => j._id === e.target.value))}
          className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-rose-400 bg-white">
          {jobs.map(j => <option key={j._id} value={j._id}>{j.title}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {selectedJob && (
        <>
          {appsError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {appsError}
            </div>
          )}

          {/* Pipeline counts */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[{ key: 'all', label: 'All', count: applications.length }, ...PIPELINE.map(s => ({
              key: s, label: STATUS_CONFIG[s].label,
              count: applications.filter(a => a.status === s).length
            }))].map(({ key, label, count }) => (
              <button key={key} onClick={() => setFilterStatus(key)}
                className={`rounded-xl p-3 text-center transition-all border-2 ${
                  filterStatus === key ? 'border-rose-500 bg-rose-50' : 'border-gray-100 bg-white hover:border-rose-200'
                }`}>
                <p className="text-xl font-bold text-gray-800">{count}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-400" />
          </div>

          {/* Candidates list */}
          {appsLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-7 h-7 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="card text-center py-14">
              <Users size={36} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-500 text-sm">No candidates found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(app => {
                const cfg = STATUS_CONFIG[app.status];
                return (
                  <div key={app._id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm shrink-0">
                      {app.applicant?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800">{app.applicant?.name}</p>
                      <p className="text-sm text-gray-500">{app.applicant?.email}</p>
                      {app.applicant?.location && <p className="text-xs text-gray-400">📍 {app.applicant.location}</p>}
                      {app.applicant?.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {app.applicant.skills.slice(0, 3).map(s => (
                            <span key={s._id || s.name} className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                              {s.icon} {s.name}
                            </span>
                          ))}
                          {app.applicant.skills.length > 3 && (
                            <span className="text-xs text-gray-400">+{app.applicant.skills.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                      {app.interviewDate && app.status === 'interview' && (
                        <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                          <Clock size={12} />
                          {new Date(app.interviewDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <button onClick={() => setDrawerApp(app)}
                        className="flex items-center gap-1.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors">
                        <Eye size={14} /> Review
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      </>
      )}

      {drawerApp && (
        <CandidateDrawer
          app={drawerApp}
          onClose={() => setDrawerApp(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
