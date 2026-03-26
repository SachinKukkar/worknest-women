import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SkillSelection from './pages/SkillSelection';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Applications from './pages/Applications';
import FinancialDashboard from './pages/FinancialDashboard';
import Profile from './pages/Profile';

import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import EmployerJobs from './pages/employer/EmployerJobs';
import EmployerCandidates from './pages/employer/EmployerCandidates';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
        <p className="text-rose-600 font-medium">Loading WorkNest...</p>
      </div>
    </div>
  );
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

// Redirects /dashboard to the right page based on role
function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return null;
  return user.role === 'employer'
    ? <Navigate to="/employer/dashboard" replace />
    : <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            {/* Shared */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/profile" element={<Profile />} />

            {/* Woman routes */}
            <Route path="/skills" element={<SkillSelection />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/finances" element={<FinancialDashboard />} />

            {/* Employer routes */}
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="/employer/jobs" element={<EmployerJobs />} />
            <Route path="/employer/candidates" element={<EmployerCandidates />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
