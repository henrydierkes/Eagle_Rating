import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate(); 
   
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
       <h1 className="logo" onClick={navigateToFrontPage}>EagleRating</h1>
      <SearchBar />
      <div className="nav-links">
        <button className="login-btn" onClick={handleLoginClick}>Log In</button>
        <div className="separator"></div>
        <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button> 
      </div>
    </div>
  );
};

export default NavBar;
