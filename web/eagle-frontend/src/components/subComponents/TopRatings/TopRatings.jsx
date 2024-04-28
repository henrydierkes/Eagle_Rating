import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopRatings.css";

const TopRatings = ({ results }) => {
  const { tags } = results;
  console.log(tags);
  const navigate = useNavigate();
const tagNames = Object.keys(tags);
  return (
    <div className="top-ratings">
      <h2 className="top-tags-name">Top Tags:</h2>
      <div className="tag-list">
        {tagNames.map((tagName, index) => (
          <span key={index} className="tag">
            {tagName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopRatings;
