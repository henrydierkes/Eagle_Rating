import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-input-group">
        <button className="search-btn">🔍</button>
        <input
          type="text"
          placeholder="Places in Emory University"
          className="search-input"
        />
        <button className="category-btn">Category ▼</button>
      </div>
    </div>
  );
};

export default SearchBar;
