import React from "react";
import "./TrendPlace.css";

function TrendPlace({ name, imageUrl }) {

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <div className="TrendPlace" style={backgroundStyle}>
      <div className="RateBar"></div>
      <div className="Name">
        <h2>{name}</h2>
      </div>
      <div className="mask"></div>
    </div>
  );
}

export default TrendPlace;
