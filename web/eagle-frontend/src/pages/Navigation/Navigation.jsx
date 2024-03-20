import NavBar from "../../components/NavBar/NavBar";
import ResultsAndFilter from "../../components/ResultsAndFilter/ResultsAndFilter"
import Footer from "../../components/Footer/Footer";
import "./Navigation.css";
import React, { useState, useEffect } from "react";

// const results = [
//   { id: 1, title: "Place 1", description: "Description for Result 1", rating: 4.5, num_rate: 33 },
//   { id: 2, title: "Place 2", description: "Description for Result 2", rating: 3.2, num_rate: 20 },
//   { id: 3, title: "Place 3", description: "Description for Result 3", rating: 2.4, num_rate: 5 },
//
//   { id: 4, title: "Place 4", description: "Description for Result 4", rating: 1.1, num_rate: 10 },
//   { id: 5, title: "Place 5", description: "Description for Result 5", rating: 2.3, num_rate: 21 },
//   { id: 6, title: "Place 6", description: "Description for Result 6", rating: 4.9, num_rate: 500 },
// ];


function Navigation() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8080/api"; // Use the environment variable here

    // Fetch the places from your backend API
    fetch(`${apiUrl}/place/get`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching data: ', error));
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
