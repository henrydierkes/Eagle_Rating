import React from "react";
import "./Category.css";
import CategoryList from "../subComponents/categoryList/categoryList";

function Category() {
  // Define your categories as an array of strings
  const categories = ["Study Spaces", "Parking Lot", "Dorm", "Bathroom", "Library"];

  return (
    <div className="Category">
      <div className="title">
        <h1>Categories</h1>
      </div>
      <CategoryList categories={categories}/>
    </div>
  );
}

export default Category;
