import React from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
function TrendPlaces() {
  return (
    <div className="TrendPlaces">
      <div className="slide">
        <TrendPlace />
        <TrendPlace />
        <TrendPlace />
        <TrendPlace />
      </div>
    </div>
  );
}
export default TrendPlaces;