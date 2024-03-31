// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setCurrentUser({ token, email });
    }
  }, []);
  const login = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setCurrentUser({ token, email });
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
