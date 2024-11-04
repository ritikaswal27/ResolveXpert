// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Ritik', role: 'manager' });

  // Login function
  const login = async (email, password) => {
    try {
      // API call for authentication
      const response = await axios.post('/api/login', { email, password });
      setUser(response.data.user); // Assuming response contains user data
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow to handle in LoginPage
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Load user data from localStorage on initial load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
