import React from "react";
import "./Category.css";
import CategoryList from "../subComponents/categoryList/categoryList";


function Category() {
  return (
    <div className="Category">
      <div className="title">
        <h1>Category</h1>
      </div>
     <CategoryList/>
    </div>
  );
}
export default Category;
