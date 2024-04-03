import React from "react";
import { Link } from "react-router-dom";
import "./TrendPlace.css";

function TrendPlace({ placeName, imageUrl, placeRating, locId }) {
    const backgroundStyle = imageUrl ? {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "auto 101%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "10px",
    } : {};

    return (
        <Link to={`/ratingpage/${locId}`} className="TrendPlace" style={backgroundStyle}>
            <div className="RateBar">
                <i className="fas" style={{ marginRight: "5px" }}></i>
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
