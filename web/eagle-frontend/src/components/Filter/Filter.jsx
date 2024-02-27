import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    option1: false,
    option2: false,
    option3: false,
  });
  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };
  const applyFilters = () => {
    // Pass the current filter state to the parent component
    onFilterChange(filters);
  };
  return (
    <div className="sidebar">
      <h2>Filter by tags</h2>
      <label>
        <input
          type="checkbox"
          checked={filters.option1}
          onChange={() => handleFilterChange('option1')}
        />
        Option 1
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.option2}
          onChange={() => handleFilterChange('option2')}
        />
        Option 2
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.option3}
          onChange={() => handleFilterChange('option3')}
        />
        Option 3
      </label>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
  }
  export default Filter;