import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <div className="background-container">
      <h1 className="university-title">EMORY UNIVERSITY</h1>
      <button className="choose-campus-btn">Choose Campus</button>
      <div className="university-address">201 Dowman Dr, Atlanta, GA</div>
    </div>
  );
};

export default Background;
