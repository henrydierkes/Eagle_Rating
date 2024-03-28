import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);


  const checkLoggedInStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in
      setIsLoggedIn(true);
      const email = localStorage.getItem('email');
      console.log('Retrieved email from local storage:', email);
      setUserEmail(email);
    } else {
      // User is not logged in
      setIsLoggedIn(false);
      setUserEmail(null);
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
       <h1 className="logo button" onClick={navigateToFrontPage}>EagleRating</h1>
      <SearchBar />
      <div className="nav-links">
        {isLoggedIn ? (
          <>
          <div className="user-email">{userEmail}</div>
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
