import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './pages/Navigation/Navigation';
import RatingPage from './pages/RatingPage/RatingPage.jsx';
import AddLocation from './pages/AddLocation/AddLocation.jsx';
import AddRating from './pages/AddRating/AddRating.jsx';
import SignUp from './pages/Login/SignUp.jsx';
import SignIn from './pages/Login/SignIn.jsx';
import Profile from './pages/Profile/Profile.jsx'
import ScrollToTop from './ScrollToTop';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import EmailVerification from './pages/Login/EmailVerification.jsx'; // Adjust the import path as necessary


import SmoothScroll from 'smooth-scroll';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

function App() {
  return (
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/navigation" element={<Navigation />} />
              <Route path="/ratingpage/:locId" element={<RatingPage />} />
                <Route path="/addLocation" element={
                  <ProtectedRoute>
                    <AddLocation />
                  </ProtectedRoute>
                } />
              <Route path="/addRating" element={
                <ProtectedRoute>
                  <AddRating />
                </ProtectedRoute>
              } />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/verify" element={<EmailVerification />} />

          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
