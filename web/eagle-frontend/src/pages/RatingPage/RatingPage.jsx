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
import axios from "axios";
import axiosConfig from "../../axiosConfig.jsx";

// Define the RatingPage functional component
function RatingPage() {
    const { locId } = useParams();
    const [placeDetails, setPlaceDetails] = useState(null);
    const [placeComments, setPlaceComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Fetch place details first
        const fetchPlaceDetails = async () => {
            try {
                const detailsResponse = await axios.get(`${axiosConfig.baseURL}/api/place/${locId}`);
                setPlaceDetails(detailsResponse.data);
                // Now fetch comments for each rating ID
                fetchComments(detailsResponse.data.ratingIds);
            } catch (error) {
                console.error('Error fetching place details:', error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchPlaceDetails();
    }, [locId]);

    // Function to fetch comments based on ratingIds
    const fetchComments = async (ratingIds) => {
        const commentRequests = ratingIds.map(ratingId =>
            Axios.get(`${axiosConfig.baseURL}/api/rating/get`, { params: { ratingId } })
        );

        try {
            const commentsResponses = await Promise.all(commentRequests);
            const comments = commentsResponses.map(res => res.data);
            setPlaceComments(comments.flat()); // Flatten in case of nested arrays
            setIsLoading(false); // Stop loading when comments are fetched
        } catch (error) {
            console.error('Error fetching comments:', error);
            setIsLoading(false); // Stop loading if there is an error
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!placeDetails) {
        return <div>Place not found or error loading details.</div>;
    }
    console.log(placeComments);

    return (
        <div className="RatingPage">
            <NavBar />
            <PlaceDetails result={placeDetails} />
            <hr className="divider" />
            <CommentFilter />
            <CommentList comments={placeComments} />
            <Footer />
        </div>
    );
}

export default RatingPage;