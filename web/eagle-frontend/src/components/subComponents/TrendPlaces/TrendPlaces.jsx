import React from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
function TrendPlaces() {
  return (
    <div className="TrendPlaces">
      <div id="slide">
        <TrendPlace />
        <TrendPlace />
        <TrendPlace />
      </div>
    </div>
  );
}
export default TrendPlaces;
