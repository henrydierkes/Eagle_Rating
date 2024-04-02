// Import necessary hooks and components from React, React Router, and Axios for making HTTP requests
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
// Import custom components used on this page
import NavBar from "../../components/NavBar/NavBar.jsx";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx";
import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx";
import CommentList from "../../components/CommentList/CommentList.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// Import specific CSS for styling this page
import "./RatingPage.css";

// Define the RatingPage functional component
function RatingPage() {
  // Extract locId (location ID) from the URL parameters
  const { locId } = useParams();
  // Initialize state for place details, comments, and loading status
  const [placeDetails, setPlaceDetails] = useState(null);
  const [placeComments, setPlaceComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch place details when component mounts or locId changes
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setIsLoading(true); // Indicate loading state
      try {
        // Make a GET request to fetch details of the place based on locId
        const response = await Axios.get(`http://localhost:8080/api/place/${locId}`);
        setPlaceDetails(response.data); // Update placeDetails state with fetched data
        console.log(response.data); // Log the fetched data for debugging
      } catch (error) {
        console.error('Error fetching place details:', error); // Log errors if any
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    fetchPlaceDetails();
  }, [locId]); // Dependency array ensures this effect runs when locId changes

  // Conditional rendering based on isLoading and placeDetails state
  if (isLoading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (!placeDetails) {
    return <div>Place not found or error loading details.</div>; // Display error message
  }

  // Render the main content of the page
  return (
      <div className="RatingPage">
        <NavBar /> {/* Display the navigation bar */}
        <PlaceDetails result={placeDetails} /> {/* Pass placeDetails to PlaceDetails component */}
        <hr className="divider" /> {/* Visual divider */}
        <CommentFilter /> {/* Component for filtering comments (not yet implemented) */}
        <CommentList comments={placeComments} /> {/* Pass placeComments to CommentList component */}
        <Footer /> {/* Display the footer */}
      </div>
  );
}

export default RatingPage; // Export the component for use in other parts of the app
