import React from "react";
import "./categoryItem.css";

function CategoryItem({ name, imageUrl }) {

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center", // Adjust the position of the background image
    backgroundRepeat: "no-repeat", // Set background repeat behavior
    borderRadius: "10px", // Apply border radius to the background
  };

  return (
    <div className="CategoryItem" style={backgroundStyle}>
      <div className="Name">
        <h2>{name}</h2>
      </div>
      <div className="Overlay"></div>
    </div>
  );
}

export default CategoryItem;
