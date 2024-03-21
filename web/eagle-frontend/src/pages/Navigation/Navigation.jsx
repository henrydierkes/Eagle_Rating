import React, { useState, useEffect } from "react";
import Axios from 'axios'; // Import Axios
import NavBar from "../../components/NavBar/NavBar";
import ResultsAndFilter from "../../components/ResultsAndFilter/ResultsAndFilter";
import Footer from "../../components/Footer/Footer";
import "./Navigation.css";

function Navigation() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8080/api"; // Adjust this as necessary

    // Use Axios to fetch the places from your backend API
    Axios.get(`${apiUrl}/place/get`)
      .then(response => {
        setResults(response.data); // Set results with response data
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="Navigation">
      <NavBar />
      <ResultsAndFilter results={results}/>
      <Footer />
    </div>
  );
}

export default Navigation;
