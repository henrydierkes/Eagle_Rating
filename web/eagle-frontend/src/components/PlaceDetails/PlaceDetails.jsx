import React, { useState } from "react";
import "./PlaceDetails.css";
import RatingBar from "../subComponents/RatingBar/RatingBar.jsx";
import TopRatings from "../subComponents/TopRatings/TopRatings.jsx";
import UserImages from "../subComponents/UserImages/UserImages.jsx";
import UserComments from "../subComponents/UserComments/UserComments.jsx";
import { useNavigate } from "react-router-dom";

// const handleAddCommentClick = () => {
//   navigate("/addComment"); // Navigate to comment page
// };

const getRatingColor = (rating) => {
  if (rating >= 4) {
    return "#4CAF50"; // green
  } else if (rating >= 3) {
    return "#CDDC39"; // lime
  } else if (rating >= 2) {
    return "#FFC107"; // amber
  } else {
    return "#F44336"; // red
  }
};
const goToPage = () => {};

const PlaceDetails = ({ result }) => {

  const navigate = useNavigate();
    const ratingColor = getRatingColor(result?.averageRating?.overall ?? 0);
    const rating = result?.averageRating?.overall ?? 'N/A';
    const numRate = result?.num_rate ?? 'N/A';
    const title = result?.title ?? 'Unknown Title';
    const building = result?.building ?? 'Unknown Building';
    const floor = result?.floor ?? 'Unknown Floor';
    const location = result?.location ?? 'Unknown Location';
    const latitude = result?.latitude ?? '';
    const longitude = result?.longitude ?? '';
  const handleAddCommentClick = () => {
    navigate("/addComment");
  };

//   const result = results[0]; // This is very important because results.rating can't read a whole array, it needs to read an item in the array

  // Function to generate Google Maps URL with latitude and longitude
  const getGoogleMapsUrl = (latitude, longitude) => {
    return `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`;
  };


  return (
    <div className="place-details">
      <div className="header">
        <div className="header-left">
          <div className="header-left-l">
            <div
              className="rating-box-details"
              style={{ backgroundColor: getRatingColor(result.averageRating) }}
            >
              <span className="rating-number-details">{result.rating}</span>
            </div>
            <p className="rating-amount">{result.num_rate + " ratings"}</p>
          </div>
          <div className="header-left-r">
            <div className="mainInfo">
              <h1 className="placeName">{result.title}</h1>
              <h3 className="building">{result.building}</h3>
              <h4 className="floor">{result.floor}</h4>
            </div>
          </div>
        </div>
        <div className="header-right">
          <RatingBar results={result} style={{ width: "100%" }} />
        </div>
      </div>

      <div className="locationAndImage">
        <div className="location">
          <a
              className="location-link"
              href={getGoogleMapsUrl(latitude, longitude)} target="_blank" rel="noopener noreferrer"
          >
            📍{result.locName}
          </a>
          <div className="map">
            <iframe
              title="Google Map"
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?&q=${result.latitude},${result.longitude}&key=AIzaSyA8kNTT8tbIbt4WGPDZNYDXC8HJX-EcPvs&zoom=17`}
            ></iframe>
          </div>
        </div>
        <div className="Image">
          <UserImages/>
        </div>
      </div>
//       <div className="tag-level">
//         <div className="tag-level-l">
//           <div className="tags">
// {/*             <TopRatings results={results} /> */}
//             {/* <UserComments results={results}/> */}
//             {/* {result.top_tags.map((tag, index) => (
//         <span key={index}>{tag}</span>
//       ))} */}
//           </div>
//         </div>
//         <div className="tag-level-r"></div>{" "}
//         {/* Add the .tag-level-r if needed */}
//       </div>

      <div className="rating-button-container">
        <button className="rating-button" onClick={handleAddCommentClick}>
          Add Rating
        </button>
      </div>
    </div>
  );
};

export default PlaceDetails;
