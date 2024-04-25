import React, { useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx'; // Adjust the path as needed
import bookmarkIcon from '../../components/subComponents/Misc/bookmark.png';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the currentUser and logout from AuthContext
  const { currentUser } = useAuth();

  useEffect(() => {
    // Now that you're using AuthContext, you don't need to check the logged-in status here.
    // The currentUser object from AuthContext already contains this information.
    // However, if you need to fetch additional user details (like userName), you can do so here using currentUser.email.
  }, [currentUser]);

  const navigateToFrontPage = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Adjust the URL as needed
  };

  return (
    <div className="nav-bar">
      <h1 className="logo button effect-shine" onClick={navigateToFrontPage}>EagleRating</h1>
      <SearchBar />
      <div className="nav-links">
        {currentUser ? (
          <>
            <a href="/BookmarkPage">
              <img src={bookmarkIcon} alt="Bookmark" style={{ maxWidth: '3vw', height: '3vh', paddingRight: '.5vw' }}/>
            </a>
            <a href="/profile" className="user-name" onClick={handleProfileClick}>
              {currentUser.username}
            </a>
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
