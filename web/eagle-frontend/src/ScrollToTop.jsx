import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Run this effect when the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
