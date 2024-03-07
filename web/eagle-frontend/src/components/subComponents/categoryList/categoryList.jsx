import React from "react";
import "./categoryList.css";
import CategoryItem from "../categoryItem/categoryItem";

function CategoryList({ categories }) {
  return (
    <div className="CategoryList">
      <div className="slide">
        {categories.map((category, index) => (
          <CategoryItem key={index} name={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
