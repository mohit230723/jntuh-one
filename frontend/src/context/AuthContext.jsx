import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { errorMessage } from '../services/mock';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ucest_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ucest_token'));
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token: jwtToken, user: userData } = response.data;
      localStorage.setItem('ucest_token', jwtToken);
      localStorage.setItem('ucest_user', JSON.stringify(userData));
      setToken(jwtToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      const status = err.response?.status;
      const message = (status === 401 || status === 403)
        ? 'Invalid username or password'
        : errorMessage(err, 'Login failed. Please try again.');
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ucest_token');
    localStorage.removeItem('ucest_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
    isStudent: user?.role === 'ROLE_STUDENT',
    isFaculty: user?.role === 'ROLE_FACULTY',
    isAdmin: user?.role === 'ROLE_ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
