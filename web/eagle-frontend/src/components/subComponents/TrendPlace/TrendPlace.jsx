import React from "react";
import { Link } from "react-router-dom";
import "./TrendPlace.css";

function TrendPlace({ placeName, imageUrl, placeRating }) {
    const backgroundStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "auto 101%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "10px",
    };

    return (
        <Link to={`/ratingpage/${placeName}`} className="TrendPlace" style={backgroundStyle}>
            <div className="RateBar">
                <i className="fas fa-star" style={{ marginRight: "5px" }}></i>
                {placeRating}
            </div>
            <div className="Name">
                <h2>{placeName}</h2>
            </div>
            <div className="Overlay"></div>
        </Link>
    );
}

export default TrendPlace;
