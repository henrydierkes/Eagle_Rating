import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./PlaceDetails.css";
import RatingBar from "../subComponents/RatingBar/RatingBar.jsx";
import TopRatings from "../subComponents/TopRatings/TopRatings.jsx";
import UserImages from "../subComponents/UserImages/UserImages.jsx";
import UserComments from "../subComponents/UserComments/UserComments.jsx";
import { useNavigate } from "react-router-dom";
import bookmarkIcon from '../subComponents/Misc/bookmark.png';
import bookmarkHighlightIcon from '../subComponents/Misc/bookmark highlight.png';
import axiosConfig from "../../axiosConfig.jsx";
import axios from "axios";
//import subrating
import SubratingData from "../../../public/jsons/Subrating.json";

// const handleAddCommentClick = () => {
//   navigate("/addComment"); // Navigate to comment page
// };

const getRatingColor = (rating) => {
    if (rating >= 4) {
        return 'rgba(0, 128, 255, 0.7)';
    } else if (rating >= 2) {
        return 'rgba(255, 193, 7, 0.7)';
    } else {
        return '#F44336';
    }
};
const goToPage = () => {};

const clickBookmarkApi = async (userId, placeId) => {
    try {
        const response = await axios.post(`${axiosConfig.baseURL}/api/user/clickBookMark`, null, {
            params: {
                userId,
                placeId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add or remove bookmark:', error);
        return null;
    }
};


const PlaceDetails = ({ result }) => {
    console.log(result);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [bookmarked, setBookmarked] = useState([]);
    const rawRating = result?.averageRating?.overall;
    const rating = rawRating ? rawRating.toFixed(1) : 'N/A';
    const ratingColor = getRatingColor(rawRating ?? 0);
    const numRate = result?.ratingCount ?? 'N/A';
    const title = result?.locName ?? 'Unknown Title';
    const building = result?.building ?? 'Unknown Building';
    const floor = result?.floor ?? 'Unknown Floor';
    const location = result?.location ?? 'Unknown Location';
    const latitude = result?.location.latitude ?? '';
    const longitude = result?.location.longitude ?? '';
    // console.log(longitude);
    // console.log(latitude);
    // find subratings to each category
    const category = result.category;
    const matchingSubratings = SubratingData.categories.find(cat => cat.category === category)?.subratings || {};
    const handleAddRatingClick = () => {
        navigate("/addRating", { state: { placeDetails: result } });
    };

    // Function to generate Google Maps URL with latitude and longitude
    const getGoogleMapsUrl = (latitude, longitude) => {
        return `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`;
    };
    // console.log(result);

    const toggleBookmark = async (placeId, e) => {
        console.log("placeId",placeId)
        e.stopPropagation(); // Prevent the click from reaching the result item

        if (!currentUser) {
            // Handle case where there is no current user (authentication error)
            return;
        }

        // Call the backend API
        const response = await clickBookmarkApi(currentUser.userId, placeId);

        // Check the response and handle success case
        if (response === 'Email verified successfully' || response.success) {
            setBookmarked((prev) => {
                if (prev.includes(placeId)) {
                    // If place is already bookmarked, remove it
                    return prev.filter((id) => id !== placeId);
                } else {
                    // If place is not bookmarked, add it
                    return [...prev, placeId];
                }
            });
        } else {
            console.error('Failed to add or remove bookmark:', response);
        }
    };

    return (
        <div className="place-details">
            <div className="header">
                <div className="header-left">
                    <div className="header-left-l">
                        <div
                            className="rating-box-details"
                            style={{ backgroundColor: ratingColor }}
                        >
                            <span className="rating-number-details">{rating}</span>
                        </div>
                        <p className="rating-amount">{numRate + " ratings"}</p>
                    </div>
                    <div className="header-left-r">
                    <h1 className="placeName">{title}</h1>
                        <h4 className="floor">{"Floor " + floor}</h4>
                        <div className="bookmark-tag" onClick={(e) => toggleBookmark(result.locIdStr, e)}>
                            {bookmarked.includes(result.locIdStr) ? (
                                < img src={bookmarkHighlightIcon} alt="Bookmarked" />
                            ) : (
                                < img src={bookmarkIcon} alt="Bookmark" />
                            )}
                        </div>
                    </div>
                </div>
              <div className="header-right">
                  <div className="rating-bar-container" style={{ width: "60%", margin: "0 auto" }}>
                    <RatingBar result={result} subratings={matchingSubratings} />
                    <button className="rating-button" onClick={handleAddRatingClick}>
                      Add Rating
                    </button>
              </div>
            </div>
        </div>
          <div className="tags">
              <TopRatings results={result} />
          </div>
        <div className="locationAndImage">
            <div className="location">
                <a
                    className="location-link"
                    href= "_blank" rel="noopener noreferrer"
                >
                    📍{result.locName}
                </a >
                <div className="map">
                    <iframe
                        title="Google Map"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps/embed/v1/place?&q=${latitude},${longitude}&key=AIzaSyA8kNTT8tbIbt4WGPDZNYDXC8HJX-EcPvs&zoom=17`}
                    ></iframe>
                </div>
            </div>
            <div className="Image">
                <UserImages placeId={result?.locIdStr}/>
            </div>
        </div>
    </div>
    );
};

export default PlaceDetails;