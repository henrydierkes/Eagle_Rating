import React from "react";
import "./categoryList.css";
import categoryItem from "../categoryItem/categoryItem";
function categoryList() {
  return (
    <div className="categories">
      <div className="slide">
        <categoryItem />
        <categoryItem />
        <categoryItem />
      </div>
    </div>
  );
}
export default categoryList;