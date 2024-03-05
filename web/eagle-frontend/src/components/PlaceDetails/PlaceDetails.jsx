import React, { useState } from 'react';
import './PlaceDetails.css';

const getRatingColor = (rating) => {
  if (rating >= 4) {
      return '#4CAF50'; // green
  } else if (rating >= 3) {
      return '#CDDC39'; // lime
  } else if (rating >= 2) {
      return '#FFC107'; // amber
  } else {
      return '#F44336'; // red
  }
};

const PlaceDetails = ({ results }) => {
  const result=results[0]; // This is very important because results.rating can't read a whole array, it needs to read an item in the array
  return (
    <div className="place-details">
      <div className='header'>
        <div
            className="rating-box-details"
            style={{ backgroundColor: getRatingColor(result.rating) }}
            >
              <span className="rating-number-details">{result.rating}</span>
        </div>
        <div className='mainInfo'>
          <h1 className='title'>{result.title}</h1>
          <h3 className='building'>{result.building}</h3>
          <h4 className='floor'>{result.floor}</h4>
        </div>
        
      </div>
      <p className="rating-amount">{result.num_rate + " ratings"}</p>
      <div className='locationAndRatings'>
        <h3 className='location'>📍{result.location}</h3>
        <div className='ratings'>
          <h3 className='size'>Size: {result.size}</h3>
          <h3 className='clean'>Clean: {result.clean}</h3>
          <h3 className='quiet'>Quiet: {result.quiet}</h3>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
