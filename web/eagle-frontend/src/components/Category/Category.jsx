import React from "react";
import "./Category.css";
import TrendPlace from "../subComponents/TrendPlace/TrendPlace";
function Category() {
  return (
    <div className="Category">
      <div className="title">
        <h1>Trending</h1>
      </div>
      <div className="items">
        <TrendPlace />
      </div>
    </div>
  );
}
export default Category;
