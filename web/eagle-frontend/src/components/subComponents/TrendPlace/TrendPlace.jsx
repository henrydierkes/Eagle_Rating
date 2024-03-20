import React from "react";
import "./TrendPlace.css";

function TrendPlace({ placeName, imageUrl, placeRating }) {

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "auto 101%",
    backgroundPosition: "center", // Adjust the position of the background image
    backgroundRepeat: "no-repeat", // Set background repeat behavior
    borderRadius: "10px", // Apply border radius to the background
  };

  return (
    <div className="TrendPlace" style={backgroundStyle}>
      <div className="RateBar">
        <i className="fas fa-star" style={{ marginRight: "5px" }}></i>
        {placeRating}
      </div>
      <div className="Name">
        <h2>{placeName}</h2>
      </div>
      <div className="Overlay"></div>
    </div>
  );
}

export default TrendPlace;
