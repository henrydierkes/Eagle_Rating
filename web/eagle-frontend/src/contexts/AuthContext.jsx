// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const email = Cookies.get('email');
    const userId=Cookies.get('userId');
    if (token && email) {
      setCurrentUser({ token, email, userId});
    }
  }, []);

  const login = (token, email) => {
    Cookies.set('token', token);
    Cookies.set('email', email);
    setCurrentUser({ token, email });
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
