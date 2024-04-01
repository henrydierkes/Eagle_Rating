// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User is not logged in, redirect to sign-in page
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
