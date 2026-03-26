import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('wn_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('wn_token');
      localStorage.removeItem('wn_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Users
export const updateProfile = (data) => API.put('/users/profile', data);
export const addSkills = (skillIds) => API.post('/users/skills', { skillIds });
export const getDashboardStats = () => API.get('/users/dashboard');

// Jobs
export const getJobs = (params) => API.get('/jobs', { params });
export const getJob = (id) => API.get(`/jobs/${id}`);
export const getRecommendedJobs = () => API.get('/jobs/recommended');
export const getMyJobs = () => API.get('/jobs/my');
export const createJob = (data) => API.post('/jobs', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);

// Applications
export const applyJob = (data) => API.post('/applications', data);
export const getMyApplications = () => API.get('/applications/my');
export const getJobApplications = (jobId) => API.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (id, data) => API.put(`/applications/${id}/status`, data);

// Skills
export const getSkills = () => API.get('/skills');
export const upsertSkill = (data) => API.post('/skills/upsert', data);

// Transactions
export const getTransactions = (params) => API.get('/transactions', { params });
export const addTransaction = (data) => API.post('/transactions', data);
export const getFinancialSummary = () => API.get('/transactions/summary');

export default API;
