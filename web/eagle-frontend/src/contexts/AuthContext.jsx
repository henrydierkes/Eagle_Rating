import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


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
    const username=Cookies.get('username');
    if (token && email) {
      setCurrentUser({ token, email,userId,username});
    }
  }, []);

  const login = (token, email) => {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    console.log(token);
    const userId = decodedToken.userIdStr;
    let username = decodedToken.username;
    // If username is null or undefined, set it to the email
    if (!username) {
      username = email;
    }
    Cookies.set('token', token);
    Cookies.set('email', email);
    Cookies.set('userId', userId);
    Cookies.set('username', username)
    // console.log(userIdStr);
    setCurrentUser({ token, email, userId,username});
  };
  const updateUsername = (newUsername) => {
    Cookies.set('username', newUsername);
    setCurrentUser(prevUser => ({
      ...prevUser,
      username: newUsername
    }));
  }

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    // Cookies.remove('userId');
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout, updateUsername };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
