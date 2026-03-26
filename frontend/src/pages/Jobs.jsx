import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../services/api';
import { Search, MapPin, Clock, IndianRupee, Filter, Briefcase } from 'lucide-react';

const TYPES = ['All', 'remote', 'freelance', 'onsite', 'hybrid'];
const CATEGORIES = ['All', 'Design', 'Writing', 'Education', 'Food', 'Data', 'Marketing', 'Beauty', 'Handcraft', 'Technology'];

function JobCard({ job }) {
  const typeColors = {
    remote: 'bg-emerald-100 text-emerald-700',
    freelance: 'bg-blue-100 text-blue-700',
    onsite: 'bg-orange-100 text-orange-700',
    hybrid: 'bg-violet-100 text-violet-700',
  };

  return (
    <Link to={`/jobs/${job._id}`}
      className="card hover:shadow-md hover:border-rose-200 transition-all group block">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {job.company[0]}
        </div>
        <span className={`badge ${typeColors[job.type] || 'bg-gray-100 text-gray-600'} capitalize`}>
          {job.type}
        </span>
      </div>
      <h3 className="font-semibold text-gray-800 group-hover:text-rose-700 transition-colors mb-1 leading-snug">
        {job.title}
      </h3>
      <p className="text-sm text-gray-500 mb-3">{job.company}</p>
      <p className="text-xs text-gray-400 line-clamp-2 mb-4">{job.description}</p>

      {/* Skills */}
      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 3).map(s => (
            <span key={s._id} className="badge bg-rose-50 text-rose-600 text-xs">{s.icon} {s.name}</span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={13} /> {job.location || 'Remote'}
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-rose-600">
          <IndianRupee size={13} />
          {job.salary?.min?.toLocaleString('en-IN')}–{job.salary?.max?.toLocaleString('en-IN')}
          <span className="text-xs font-normal text-gray-400">/{job.salary?.period}</span>
        </div>
      </div>
      {job.isWomenOnly && (
        <div className="mt-2 text-xs text-rose-500 font-medium flex items-center gap-1">
          👩 Women preferred
        </div>
      )}
    </Link>
  );
}

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchJobs = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (typeFilter !== 'All') params.type = typeFilter;
    if (categoryFilter !== 'All') params.category = categoryFilter;
    getJobs(params).then(res => setJobs(res.data.jobs))
      .catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { fetchJobs(); }, [typeFilter, categoryFilter]);

  const handleSearch = e => { e.preventDefault(); fetchJobs(); };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">Find Jobs</h1>
        <p className="text-gray-500 text-sm mt-1">{jobs.length} opportunities available for you</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search jobs, companies..." className="input pl-10" />
        </div>
        <button type="submit" className="btn-primary px-5">Search</button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 text-sm text-gray-500 mr-1">
          <Filter size={14} /> Type:
        </div>
        {TYPES.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${
              typeFilter === t ? 'bg-rose-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300'
            }`}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 text-sm text-gray-500 mr-1">
          <Filter size={14} /> Category:
        </div>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategoryFilter(c)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              categoryFilter === c ? 'bg-rose-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500">No jobs found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map(job => <JobCard key={job._id} job={job} />)}
        </div>
      )}
    </div>
  );
}
