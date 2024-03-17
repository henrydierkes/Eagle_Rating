import React from "react";
import "./categoryItem.css";

function CategoryItem({ name, imageUrl }) {

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <div className="CategoryItem" style={backgroundStyle}>
      <div className="Name">
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default CategoryItem;
