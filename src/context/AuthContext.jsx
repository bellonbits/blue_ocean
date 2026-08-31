import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('blue_ocean_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('blue_ocean_token') || null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync token and user to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('blue_ocean_token', token);
    } else {
      localStorage.removeItem('blue_ocean_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('blue_ocean_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('blue_ocean_user');
    }
  }, [user]);

  const openAuthModal = useCallback((tab = 'login') => {
    setAuthModalTab(tab);
    setError(null);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
    setError(null);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login-json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Login failed. Please verify your credentials.');
      }

      setToken(data.access_token);
      setUser(data.user);
      closeAuthModal();
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Registration failed. Please try again.');
      }

      setToken(data.access_token);
      setUser(data.user);
      closeAuthModal();
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('blue_ocean_user');
    localStorage.removeItem('blue_ocean_token');
  }, []);

  const updateProfile = async (fullName, phone, avatarUrl) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ full_name: fullName.trim(), phone: phone || null, avatar_url: avatarUrl || null }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Could not update your profile.');
      }

      setUser(data);
      return { success: true, user: data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateNotificationPreferences = async (preferences) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/me/notifications`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(preferences),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Could not save notification preferences.');
      }

      setUser(data);
      return { success: true, user: data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/me/activity`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Could not load recent activity.');
      return { success: true, activity: await res.json() };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || 'Could not change your password.');
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    error,
    setError,
    authModalOpen,
    authModalTab,
    setAuthModalTab,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    updateNotificationPreferences,
    fetchActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
