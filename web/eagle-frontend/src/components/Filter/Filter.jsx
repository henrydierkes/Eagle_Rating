import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [tags, setTags] = useState([]);

  const handleTagChange = (e) => {
    const tag = e.target.value.trim();
    if (tag === '') return;
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    e.target.value = '';
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const applyFilters = () => {
    onFilterChange(tags);
  };

  return (
    <div className="sidebar">
      <h2>Filter by tags</h2>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button onClick={() => removeTag(tag)}>x</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add tag"
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleTagChange(e);
        }}
      />
      <button onClick={applyFilters}>Add tags</button>
    </div>
  );
};

export default Filter;
