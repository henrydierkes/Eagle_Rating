import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import ResultsAndFilter from "../../components/ResultsAndFilter/ResultsAndFilter";
import Footer from "../../components/Footer/Footer";
import "./Navigation.css";

function Navigation() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('locName');
    const categoryQuery = searchParams.get('category');
  
    if (searchQuery && categoryQuery) {
      const apiUrl = `http://localhost:8080/api/place/search?locName=${searchQuery}&category=${categoryQuery}`;
      Axios.get(apiUrl)
        .then(response => {
          console.log('Data fetched:', response.data);
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results: ', error);
        });
    } else if (searchQuery) {
      const apiUrl = `http://localhost:8080/api/place/search?locName=${searchQuery}`;
      Axios.get(apiUrl)
        .then(response => {
          console.log('Data fetched:', response.data);
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results: ', error);
        });
    } else if (categoryQuery) {
      const apiUrl = `http://localhost:8080/api/place/search?category=${categoryQuery}`;
      Axios.get(apiUrl)
        .then(response => {
          console.log('Data fetched:', response.data);
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results: ', error);
        });
    } else {
      Axios.get(`http://localhost:8080/api/place/get`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [location.search]);
  

  // Function to handle place click
  const handlePlaceClick = (placeId) => {
    // Navigate to the place detail page with the placeId as a parameter
    navigate(`/ratingpage/${placeId}`);
  };

  return (
    <div className="Navigation">
      <NavBar />
      {/* Assuming ResultsAndFilter can accept an onClick handler for each result */}
      <ResultsAndFilter results={results} onPlaceClick={handlePlaceClick} />
      <Footer />
    </div>
  );
}

export default Navigation;
