import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wn_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('wn_token');
    if (token) {
      getMe()
        .then(res => setUser(res.data.user))
        .catch(() => { localStorage.removeItem('wn_token'); localStorage.removeItem('wn_user'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = (token, userData) => {
    localStorage.setItem('wn_token', token);
    localStorage.setItem('wn_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('wn_token');
    localStorage.removeItem('wn_user');
    setUser(null);
  };

  const refreshUser = async () => {
    const res = await getMe();
    setUser(res.data.user);
    localStorage.setItem('wn_user', JSON.stringify(res.data.user));
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
