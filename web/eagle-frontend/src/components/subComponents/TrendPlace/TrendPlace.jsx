import React from "react";
import "./TrendPlace.css";
function TrendPlace({ name }) {
  return<div className="TrendPlace">
            <div className="RateBar"></div>
            <div className="Name">
              <h2>{name}</h2>
            </div>
            <div className="mask"></div>
        </div>;
}

export default TrendPlace;
