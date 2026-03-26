import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getRecommendedJobs } from '../services/api';
import { TrendingUp, Briefcase, FileText, Star, ArrowRight, IndianRupee, CheckCircle, Clock } from 'lucide-react';

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

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getRecommendedJobs()])
      .then(([statsRes, jobsRes]) => {
        setStats(statsRes.data.stats);
        setJobs(jobsRes.data.jobs.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    </div>
  );

  const fmt = n => `₹${(n || 0).toLocaleString('en-IN')}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">
            Good morning, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's your WorkNest overview for today</p>
        </div>
        <Link to="/jobs" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Briefcase size={16} /> Find Jobs
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={IndianRupee} label="Total Earnings" value={fmt(stats?.totalEarnings)} sub="All time" color="bg-emerald-100 text-emerald-600" />
        <StatCard icon={TrendingUp} label="Savings" value={fmt(stats?.savings)} sub="Income – Expenses" color="bg-blue-100 text-blue-600" />
        <StatCard icon={FileText} label="Applications" value={stats?.totalApplications || 0} sub="Total applied" color="bg-rose-100 text-rose-600" />
        <StatCard icon={CheckCircle} label="Accepted" value={stats?.accepted || 0} sub={`${stats?.pending || 0} pending`} color="bg-amber-100 text-amber-600" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/skills" className="card hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-11 h-11 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
            <Star size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Update Skills</p>
            <p className="text-xs text-gray-400">{user?.skills?.length || 0} skills added</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-rose-500 transition-colors" />
        </Link>
        <Link to="/applications" className="card hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-11 h-11 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <FileText size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">My Applications</p>
            <p className="text-xs text-gray-400">Track your progress</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-rose-500 transition-colors" />
        </Link>
        <Link to="/finances" className="card hover:shadow-md transition-shadow flex items-center gap-4 group">
          <div className="w-11 h-11 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Finances</p>
            <p className="text-xs text-gray-400">Track income & savings</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-rose-500 transition-colors" />
        </Link>
      </div>

      {/* Recommended Jobs */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-gray-800">Recommended for You</h2>
          <Link to="/jobs" className="text-sm text-rose-600 font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <Star size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm">Add skills to get personalized job recommendations</p>
            <Link to="/skills" className="btn-primary inline-block mt-4 text-sm py-2">Add Skills</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map(job => (
              <Link key={job._id} to={`/jobs/${job._id}`}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/50 transition-all group">
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-rose-700">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.company} · {job.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-rose-600">
                    ₹{job.salary?.min?.toLocaleString('en-IN')}–{job.salary?.max?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{job.salary?.period}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Progress hint */}
      {(!user?.skills || user.skills.length === 0) && (
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-5 text-white flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold mb-1">Complete your profile to get started! 🚀</p>
            <p className="text-rose-100 text-sm">Add your skills and get matched with the best jobs.</p>
          </div>
          <Link to="/skills" className="bg-white text-rose-600 font-semibold px-5 py-2 rounded-xl text-sm whitespace-nowrap hover:bg-rose-50 transition-colors">
            Add Skills
          </Link>
        </div>
      )}
    </div>
  );
}
