import React from "react";
import "./categoryList.css";
import CategoryItem from "../categoryItem/categoryItem";

function CategoryList() {
  return (
    <div className="CategoryList">
      <div className="slide">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </div>
  );
}

export default CategoryList;
