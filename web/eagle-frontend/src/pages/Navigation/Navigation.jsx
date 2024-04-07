import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import ResultsAndFilter from "../../components/ResultsAndFilter/ResultsAndFilter";
import Footer from "../../components/Footer/Footer";
import "./Navigation.css";
import axiosConfig from "../../axiosConfig.jsx";

function Navigation() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedResults, setDisplayedResults] = useState(5); // Number of results to display initially
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('locName');
    const categoryQuery = searchParams.get('category');
    const fetchData = async () => {
      try {
        setLoading(true);
        let apiUrl = `${axiosConfig.baseURL}/api/place/get`;
        if (searchQuery && categoryQuery) {
          apiUrl = `${axiosConfig.baseURL}/api/place/search?locName=${searchQuery}&category=${categoryQuery}`;
        } else if (searchQuery) {
          apiUrl = `${axiosConfig.baseURL}/api/place/search?locName=${searchQuery}`;
        } else if (categoryQuery) {
          apiUrl = `${axiosConfig.baseURL}/api/place/search?category=${categoryQuery}`;
        }
        const response = await Axios.get(apiUrl);
        setResults(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search]);

  // Function to handle place click
  const handlePlaceClick = (placeId) => {
    // Navigate to the place detail page with the placeId as a parameter
    navigate(`/ratingpage/${placeId}`);
  };

  // Function to load more results
  const loadMoreResults = () => {
    setDisplayedResults(prev => prev + 5); // Increase the number of displayed results by 10
  };

  return (
    <div className="Navigation">
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ResultsAndFilter results={results.slice(0, displayedResults)} onPlaceClick={handlePlaceClick} />
      )}
      {results.length > displayedResults && (
        <button className='load-more-button'onClick={loadMoreResults}>Load More</button> // Show load more button if there are more results to load
      )}
      <Footer />
    </div>
  );
}

export default Navigation;
