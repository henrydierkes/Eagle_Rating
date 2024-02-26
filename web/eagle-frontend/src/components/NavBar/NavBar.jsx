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
        <button className="signup-btn">SignUp</button>
      </div>
    </div>
  );
};

export default NavBar;
