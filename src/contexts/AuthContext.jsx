import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'uniformlab_user';
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.user && parsed.token) {
        setUser(parsed.user);
        setToken(parsed.token);
      } else if (parsed) {
        // Backwards compatibility with older shape that stored user only
        setUser(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage whenever auth state changes
  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ user, token: token || null })
        );
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user, token]);

  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error('Email and password are required');
    const res = await fetch(`${API_BASE}/api/public/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.error?.message || 'Could not log in');
    }
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const signup = async ({ name, email, phone, password }) => {
    if (!name || !email || !password) {
      throw new Error('Name, email and password are required');
    }
    const res = await fetch(`${API_BASE}/api/public/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.error?.message || 'Could not sign up');
    }
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (updates) => {
    // Optimistic local update
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));

    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/customer/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data && data.id) {
        setUser({ id: data.id, name: data.name, email: data.email, phone: data.phone });
      }
    } catch {
      // ignore network errors; local state already updated
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
