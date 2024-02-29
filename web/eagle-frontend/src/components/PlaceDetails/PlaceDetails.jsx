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
      <div
          className="rating-box-details"
          style={{ backgroundColor: getRatingColor(result.rating) }}
          >
            <span className="rating-number-details">{result.rating}</span>
      </div>
      <p className="rating-amount">{result.num_rate + " ratings"}</p>
    </div>
  );
};

export default PlaceDetails;
