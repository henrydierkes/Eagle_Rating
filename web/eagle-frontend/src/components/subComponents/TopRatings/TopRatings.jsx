import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopRatings.css";

const TopRatings = ({ results }) => {
  const { top_tags } = results[0];

  const navigate = useNavigate();

  return (
    <div className="top-ratings">
      <h2 className="top-tags-name">Top Tags:</h2>
      <div className="tag-list">
        {top_tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopRatings;
