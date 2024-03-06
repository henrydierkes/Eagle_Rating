import React from "react";
import "./categoryItem.css";

function CategoryItem({ name }) {
  return (
    <div className="CategoryItem">
      <div className="Name">
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default CategoryItem;
