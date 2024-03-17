import React from "react";
import "./TrendPlace.css";

function TrendPlace({ placeName, imageUrl, placeRating }) {

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <div className="TrendPlace" style={backgroundStyle}>
      <div className="RateBar">{placeRating}</div>
      <div className="Name">
        <h2>{placeName}</h2>
      </div>
      <div className="mask"></div>
    </div>
  );
}

export default TrendPlace;
