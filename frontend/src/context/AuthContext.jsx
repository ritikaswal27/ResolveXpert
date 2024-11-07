// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const [user, setUser] = useState(savedUser);
  const [loading, setLoading] = useState(false);
  const url = 'http://127.0.0.1:8088';

  // Login function
  const login = async (username, password) => {
    try {
      // API call for authentication
      const response = await axios.post(`${url}/api/login`, {
        username,
        password,
      });
      console.log(response);
      console.log(response.data);
      setUser(response.data); // Assuming response contains user data
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow to handle in LoginPage
    }
  };

  // Logout function
  const logout = () => {
    console.log('logout');
    setUser(null);
    localStorage.removeItem('user');
  };

  // Load user data from localStorage on initial load
  // React.useEffect(() => {
  //   const savedUser = localStorage.getItem('user');
  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }
  //   setLoading(false);
  // }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, url }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
