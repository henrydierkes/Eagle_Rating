import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <h1 className="logo">EagleRating</h1>
      <SearchBar />
      <div className="nav-links">
        <button className="login-btn">Login</button>
        <div className="separator"></div>
        <button className="signup-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default NavBar;
