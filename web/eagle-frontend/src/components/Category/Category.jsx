import React from "react";
import "./Category.css";
import categoryList from "../subComponents/categoryList/categoryList.jsx"

function Category() {
  return (
    <div className="Category">
      <div className="title">
        <h1>Category</h1>
      </div>
     <categoryList/>
    </div>
  );
}
export default Category;
