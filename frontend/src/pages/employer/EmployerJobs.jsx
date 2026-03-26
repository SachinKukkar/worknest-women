import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyJobs, getJobApplications, updateJob } from '../../services/api';
import { PlusCircle, Users, ToggleLeft, ToggleRight, Eye, Briefcase } from 'lucide-react';

export default function EmployerJobs() {
  const [jobs, setJobs] = useState([]);
  const [appCounts, setAppCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);

  const load = async () => {
    const res = await getMyJobs();
    const myJobs = res.data.jobs;
    setJobs(myJobs);
    const counts = {};
    await Promise.all(myJobs.map(async job => {
      try {
        const r = await getJobApplications(job._id);
        counts[job._id] = r.data.applications.length;
      } catch { counts[job._id] = 0; }
    }));
    setAppCounts(counts);
  };

  useEffect(() => { load().catch(console.error).finally(() => setLoading(false)); }, []);

  const toggleStatus = async (job) => {
    setToggling(job._id);
    try {
      const newStatus = job.status === 'open' ? 'closed' : 'open';
      await updateJob(job._id, { status: newStatus });
      setJobs(prev => prev.map(j => j._id === job._id ? { ...j, status: newStatus } : j));
    } catch (err) { console.error(err); }
    finally { setToggling(null); }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">My Job Listings</h1>
          <p className="text-gray-500 text-sm mt-1">{jobs.length} job{jobs.length !== 1 ? 's' : ''} posted</p>
        </div>
        <Link to="/employer/post-job" className="btn-primary flex items-center gap-2">
          <PlusCircle size={16} /> Post Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="card text-center py-16">
          <Briefcase size={40} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">No jobs posted yet</p>
          <Link to="/employer/post-job" className="btn-primary inline-block mt-4 text-sm py-2">Post Your First Job</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job._id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-800">{job.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    job.status === 'open' ? 'bg-emerald-100 text-emerald-700' :
                    job.status === 'filled' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>{job.status}</span>
                  {job.isWomenOnly && <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">🌸 Women only</span>}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{job.company} · {job.type} · {job.category}</p>
                <p className="text-sm text-gray-500">
                  ₹{job.salary?.min?.toLocaleString('en-IN')} – ₹{job.salary?.max?.toLocaleString('en-IN')} / {job.salary?.period}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Posted {new Date(job.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl">
                  <Users size={14} className="text-rose-500" />
                  <span className="font-medium">{appCounts[job._id] || 0}</span>
                  <span className="text-gray-400">applicants</span>
                </div>

                <Link to={`/employer/candidates?job=${job._id}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors">
                  <Eye size={14} /> View
                </Link>

                <button onClick={() => toggleStatus(job)} disabled={toggling === job._id}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl transition-colors ${
                    job.status === 'open'
                      ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  }`}>
                  {toggling === job._id
                    ? <span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" />
                    : job.status === 'open'
                      ? <><ToggleRight size={16} /> Close</>
                      : <><ToggleLeft size={16} /> Reopen</>
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
