import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Background.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Background = () => {

  const navigate = useNavigate();

  return (
    <div className="background-container">
      <h1 className="university-title">EMORY UNIVERSITY</h1>
      <button className="choose-campus-btn" onClick={() => navigate('/addLocation')}>Add Location</button>
    </div>
  );
};

export default Background;
