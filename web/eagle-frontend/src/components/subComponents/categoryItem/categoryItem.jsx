import React from "react";
import "./categoryItem.css";
import axios from "axios";

function CategoryItem({ name, imageUrl }) {
    const backgroundStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "10px",
    };

    const handleClick = () => {
        console.log("clicked");
        window.location.href = `/navigation?search=${encodeURIComponent(name)}`;
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
