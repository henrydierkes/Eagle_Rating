import React from "react";
import "./categoryItem.css";
import axios from "axios";

function CategoryItem({ name, imageUrl }) {

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center", // Adjust the position of the background image
    backgroundRepeat: "no-repeat", // Set background repeat behavior
    borderRadius: "10px", // Apply border radius to the background
  };

  const handleClick = () => {
    console.log("clicked");
    axios.get("http://localhost:8080/api/place/search", {
      params: {
        category: name
      }
    })
    .then(response => {
      // Handle the response data here
      console.log("Response data:", response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  };

  return (
    <div className="CategoryItem" style={backgroundStyle} onClick={handleClick}>
      <div className="Name">
        <h2>{name}</h2>
      </div>
      <div className="Overlay"></div>
    </div>
  );
}

export default CategoryItem;
