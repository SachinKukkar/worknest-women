import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Briefcase, Star, FileText,
  TrendingUp, User, LogOut, Menu, X, Bell,
  PlusCircle, Users
} from 'lucide-react';
import { useState } from 'react';

const WOMAN_NAV = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/skills',       icon: Star,            label: 'My Skills' },
  { to: '/jobs',         icon: Briefcase,       label: 'Find Jobs' },
  { to: '/applications', icon: FileText,        label: 'Applications' },
  { to: '/finances',     icon: TrendingUp,      label: 'Finances' },
  { to: '/profile',      icon: User,            label: 'Profile' },
];

const EMPLOYER_NAV = [
  { to: '/employer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/employer/post-job',  icon: PlusCircle,      label: 'Post a Job' },
  { to: '/employer/jobs',      icon: Briefcase,       label: 'My Jobs' },
  { to: '/employer/candidates',icon: Users,           label: 'Candidates' },
  { to: '/profile',            icon: User,            label: 'Profile' },
];

export default function Layout() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isEmployer = user?.role === 'employer';
  const navItems = isEmployer ? EMPLOYER_NAV : WOMAN_NAV;

  const handleLogout = () => { logoutUser(); navigate('/'); };

  return (
    <div className="min-h-screen bg-rose-50 flex">
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col transition-transform duration-300
        lg:translate-x-0 lg:static lg:shadow-sm lg:border-r lg:border-rose-100
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-rose-100">
          <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">WN</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-gray-800 leading-none">WorkNest</h1>
            <p className="text-xs text-rose-500 font-medium">{isEmployer ? 'Employer' : 'Women'}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-rose-50">
          <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl">
            <div className="w-9 h-9 bg-rose-200 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700'
                }`
              }>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-rose-100">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-rose-100 px-4 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-rose-600">
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-rose-50 text-gray-500 hover:text-rose-600 transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm">
            {user?.name?.[0]?.toUpperCase()}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="page-enter max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
