import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedInStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in
      setIsLoggedIn(true);
    } else {
      // User is not logged in
      setIsLoggedIn(false);
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

  return (
    <div className="nav-bar">
       <h1 className="logo button" onClick={navigateToFrontPage}>EagleRating</h1>
      <SearchBar />
      <div className="nav-links">
        {/* Conditionally render profile picture or login/sign-up buttons */}
        {isLoggedIn ? (
          <div className="profile-pic">
            {/* Replace 'profile-pic' with the component displaying the user's profile picture */}
            {/* You can also add a dropdown menu for user settings */}
          </div>
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
