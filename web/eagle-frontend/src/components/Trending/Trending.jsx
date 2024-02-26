import React from "react";
import TrendPlaces from "../subComponents/TrendPlaces/TrendPlaces";
import "./Trending.css";
function Trending() {
  return (
    <div className="Trending">
      <div className="title">
        <h1>Trending</h1>
      </div>
      <TrendPlaces />
    </div>
  );
}
export default Trending;
