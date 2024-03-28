import React from "react";
import "./RatingBar.css";

const RatingBar = ({ results }) => {
  // Ensure that there's at least one result and it has a details object
//   if (!results || results.length === 0 || !results[0].details) {
//     return <div>No details available.</div>;
//   }

  // Extract the details object from the first result
  const { details } = results;

  // Helper function to convert rating to a percentage
  const getPercentage = (rating) => `${(rating / 5) * 100}%`;

  // Create an array from the details object and map over it to generate the rating bars
  return (
    <div className="rating-bar-container">
      {" "}
      {/* Add this wrapper container */}
      {Object.entries(details).map(([detailKey, detailValue]) => (
        <div key={detailKey} className="rating-container">
          <label className="rating-label">
            {detailValue.name.toUpperCase()}
          </label>
          <div className="rating-bar-background">
            <div
              className="rating-fill"
              style={{ width: getPercentage(detailValue.averageRating.overall) }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingBar;
