import React from "react";
import "./RatingBar.css";

const RatingBar = ({ result, subratings }) => {
  // Helper function to convert rating to a percentage
  const getPercentage = (rating) => `${(rating / 5) * 100}%`;

  // Check if result and subratings data are provided
  if (!result || !result.averageRating) {
    return <div>No rating data available.</div>;
  }

  // If subratings are not provided, use the default structure from the averageRating in result
  const averageRatingEntries = Object.entries(result.averageRating);
  const [, ...remainingAverageRatings] = averageRatingEntries;

  // Use the provided subratings data to generate rating bars
  return (
      <div className="rating-bar-container">
        {remainingAverageRatings.map(([key, rating]) => {
          // Adjust the key to match the subratings key structure (e.g., rating1, rating2, etc.)
          const adjustedKey = `subrating${key.slice(-1)}`;
          const label = subratings[adjustedKey] || key.toUpperCase();

          return (
              <div key={key} className="rating-container">
                <label className="rating-label">{label.toUpperCase()}</label>
                <div className="rating-bar-background">
                  <div
                      className="rating-fill"
                      style={{ width: getPercentage(rating) }}
                  ></div>
                </div>
              </div>
          );
        })}
      </div>
  );
};

export default RatingBar;
