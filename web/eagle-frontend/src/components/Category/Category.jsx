import React from "react";
import "./Category.css";
import CategoryList from "../subComponents/categoryList/categoryList";

function Category() {
  // Define your categories as an array of strings
  const things = [
    {  category: "Study Spaces", url: "images/cand.jpeg" },
    {  category: "Parking Lot", url: "images/cand.jpeg"},
    {  category: "Dorm", url: "images/cand.jpeg"},
    {  category: "Bathroom", url: "images/cand.jpeg"},
    {  category: "Library", url: "images/cand.jpeg"}];

  return (
    <div className="Category">
      <div className="title">
        <h1>Categories</h1>
      </div>
      <CategoryList categories={things}/>
    </div>
  );
}

export default Category;
