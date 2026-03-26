import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyJobs, getJobApplications } from '../../services/api';
import { Briefcase, Users, CheckCircle, Clock, PlusCircle, ArrowRight, Eye } from 'lucide-react';

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="stat-card">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [appCounts, setAppCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyJobs().then(async res => {
      const myJobs = res.data.jobs;
      setJobs(myJobs);
      const counts = {};
      await Promise.all(myJobs.map(async job => {
        try {
          const r = await getJobApplications(job._id);
          counts[job._id] = r.data.applications;
        } catch { counts[job._id] = []; }
      }));
      setAppCounts(counts);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const allApps = Object.values(appCounts).flat();
  const totalApplicants = allApps.length;
  const hired = allApps.filter(a => a.status === 'accepted').length;
  const interviews = allApps.filter(a => a.status === 'interview').length;
  const openJobs = jobs.filter(j => j.status === 'open').length;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's your hiring overview</p>
        </div>
        <Link to="/employer/post-job" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <PlusCircle size={16} /> Post a Job
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Jobs Posted" value={jobs.length} sub={`${openJobs} active`} color="bg-rose-100 text-rose-600" />
        <StatCard icon={Users} label="Total Applicants" value={totalApplicants} sub="Across all jobs" color="bg-blue-100 text-blue-600" />
        <StatCard icon={Clock} label="Interviews" value={interviews} sub="Scheduled" color="bg-amber-100 text-amber-600" />
        <StatCard icon={CheckCircle} label="Hired" value={hired} sub="Accepted candidates" color="bg-emerald-100 text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/employer/post-job" className="card hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-11 h-11 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <PlusCircle size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Post New Job</p>
            <p className="text-xs text-gray-400">Reach skilled women</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-rose-500 transition-colors" />
        </Link>
        <Link to="/employer/jobs" className="card hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Manage Jobs</p>
            <p className="text-xs text-gray-400">View & edit listings</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-rose-500 transition-colors" />
        </Link>
        <Link to="/employer/candidates" className="card hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-11 h-11 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Users size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">All Candidates</p>
            <p className="text-xs text-gray-400">Review applications</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-rose-500 transition-colors" />
        </Link>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-gray-800">Your Active Jobs</h2>
          <Link to="/employer/jobs" className="text-sm text-rose-600 font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <Briefcase size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm">No jobs posted yet</p>
            <Link to="/employer/post-job" className="btn-primary inline-block mt-4 text-sm py-2">Post Your First Job</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.slice(0, 5).map(job => {
              const apps = appCounts[job._id] || [];
              const pending = apps.filter(a => a.status === 'pending').length;
              return (
                <Link key={job._id} to={`/employer/candidates?job=${job._id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/50 transition-all group">
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-rose-700">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.type} · {job.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {pending > 0 && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                        {pending} new
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      job.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>{job.status}</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users size={14} /> {apps.length}
                    </div>
                    <Eye size={16} className="text-gray-300 group-hover:text-rose-500" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {totalApplicants > 0 && (
        <div className="card">
          <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Hiring Pipeline</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Pending Review', count: allApps.filter(a => a.status === 'pending').length, color: 'bg-gray-100 text-gray-600' },
              { label: 'Reviewed', count: allApps.filter(a => a.status === 'reviewed').length, color: 'bg-blue-100 text-blue-600' },
              { label: 'Interview', count: interviews, color: 'bg-amber-100 text-amber-700' },
              { label: 'Hired', count: hired, color: 'bg-emerald-100 text-emerald-700' },
            ].map(({ label, count, color }) => (
              <div key={label} className={`rounded-xl p-4 ${color}`}>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
