// import React, { useState, useEffect } from "react";
// import Axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
// import NavBar from "../../components/NavBar/NavBar";
// import ResultsAndFilter from "../../components/ResultsAndFilter/ResultsAndFilter";
// import Footer from "../../components/Footer/Footer";
// import "./Navigation.css";
//
// function Navigation() {
//   const [results, setResults] = useState([]);
//   const location = useLocation(); // Get access to the location object
//
//   useEffect(() => {
//     // Extract the search query parameter from the URL
//     const searchParams = new URLSearchParams(location.search);
//     const searchQuery = searchParams.get('search');
//
//     if (searchQuery) {
//       // Make an API call using the search query
//       const apiUrl = `http://localhost:8080/api/place/search?locName=${searchQuery}`; // Adjust the endpoint as needed
//
//       Axios.get(apiUrl)
//         .then(response => {
//           console.log('Data fetched:', response.data);
//           setResults(response.data); // Set results with the search results
//         })
//         .catch(error => {
//           console.error('Error fetching search results: ', error);
//         });
//     } else {
//       // If there is no search query, you can decide to fetch all places or do nothing
//       // Here's how you'd fetch all places
//       Axios.get(`http://localhost:8080/api/place/get`)
//         .then(response => {
//           setResults(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching data: ', error);
//         });
//     }
//   }, [location.search]); // Run the effect when the search query changes
//
//   return (
//     <div className="Navigation">
//       <NavBar />
//       <ResultsAndFilter results={results}/>
//       <Footer />
//     </div>
//   );
// }
//
// export default Navigation;
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
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      const apiUrl = `http://localhost:8080/api/place/search?locName=${searchQuery}`;
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
