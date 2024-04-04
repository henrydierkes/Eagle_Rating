import React from "react";
import "./Category.css";
import CategoryList from "../subComponents/categoryList/categoryList";


function Category() {

  const things = [
    {  category: "Study Space", url: "images/studys.webp" },
    {  category: "Parking Lot", url: "images/parking.jpg"},
    {  category: "Dorm", url: "images/dorm.jpeg"},
    {  category: "Bathroom", url: "images/bathroom.jpeg"},
    {  category: "Library", url: "images/lib.jpeg"}];

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
