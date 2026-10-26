import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import ENDPOINTS from '../api/endpoints';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('koda_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('koda_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Fetch current user from /auth/me when token is present
  const refreshUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosClient.get(ENDPOINTS.AUTH.ME);
      // The API returns { success: true, user: { ... } } or similar
      const userData = res.user || res.data || res;
      setUser(userData);
      localStorage.setItem('koda_user', JSON.stringify(userData));
    } catch (err) {
      console.warn('Failed to refresh user profile:', err.message);
      // If unauthorized, token is already purged by axiosClient interceptor
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Handle external logout events (e.g., from 401 interceptor)
  useEffect(() => {
    const handleForceLogout = () => {
      setToken(null);
      setUser(null);
    };
    window.addEventListener('koda_auth_logout', handleForceLogout);
    return () => window.removeEventListener('koda_auth_logout', handleForceLogout);
  }, []);

  // Standard Login function
  const login = async (email, password) => {
    const res = await axiosClient.post(ENDPOINTS.AUTH.LOGIN, { email, password });
    
    // API typically returns token in response or cookie:
    const receivedToken = res.token || res.data?.token;
    const receivedUser = res.user || res.data?.user;

    if (receivedToken) {
      localStorage.setItem('koda_token', receivedToken);
      setToken(receivedToken);
    }
    if (receivedUser) {
      localStorage.setItem('koda_user', JSON.stringify(receivedUser));
      setUser(receivedUser);
    } else {
      await refreshUser();
    }

    return res;
  };

  // Standard Logout function
  const logout = async () => {
    try {
      await axiosClient.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      console.error('Logout error:', err.message);
    } finally {
      localStorage.removeItem('koda_token');
      localStorage.removeItem('koda_user');
      setToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
