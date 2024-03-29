import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);


  const checkLoggedInStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const email = localStorage.getItem('email');
      setUserEmail(email);
      try {
        const userData = await getUserByEmail(email); // Fetch user data
        setUserName(userData ? userData.name : null); // Set userId if user data is available
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/getByEmail?email=${email}`);
      console.log(response)
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, []);
   
    const navigateToFrontPage = () => {
      navigate('/home'); 
    };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  // Function to handle sign up button click
  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to signup page
  };

  const handleLogoutClick = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // Update state to reflect logged out state
    setIsLoggedIn(false);
    setUserEmail(null);
    // Redirect to home page or any other page after logout
    navigate('/');
  };

  return (
    <div className="nav-bar">
      <h1 className="logo button effect-shine" onClick={navigateToFrontPage}>EagleRating</h1>
      <SearchBar />
      <div className="nav-links">
        {isLoggedIn ? (
          <>
          {userName ? (
        <div className="user-email">{userName}</div>
          ) : (
        <div className="user-email">{userEmail}</div>
          )}
          <button className="signup-btn" onClick={handleLogoutClick}>Log Out</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={handleLoginClick}>Log In</button>
            <div className="separator"></div>
            <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
