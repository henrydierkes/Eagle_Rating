import React, { useState, useEffect } from "react";
import {json, useParams} from "react-router-dom";
import Axios from 'axios';
import NavBar from "../../components/NavBar/NavBar.jsx";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx";
import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx";
import CommentList from "../../components/CommentList/CommentList.jsx";
import Footer from "../../components/Footer/Footer.jsx";
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
// Function to update a single comment in placeComments
    const updateComment = (updatedComment) => {
        setPlaceComments(prevComments =>
            prevComments.map(comment =>
                comment.ratingId === updatedComment.ratingId ? updatedComment : comment
            )
        );
    };

// Function to handle the thumbs click within CommentList
    const onThumbsClick = async (commentId, type, userId) => {
        // define isLike state
        const isLike = type === 'upvote';

        // construct post request
        try {
            const response = await axios({
                method: 'post',
                url: `${axiosConfig.baseURL}/api/rating/like`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: `like=${isLike}&ratingId=${commentId}&userId=${userId}`
            });
            if (response.status === 200) {
                setPlaceComments((currentComments) => {
                    return currentComments.map((comment) => {
                        if (comment.ratingIdStr === commentId) {
                            let newLikes = [...comment.likes];
                            let newDislikes = [...comment.dislikes];

                            if (isLike) {
                                // Check if user ID is in likes
                                if (newLikes.includes(userId)) {
                                    // If user ID is in likes, remove it
                                    newLikes = newLikes.filter(id => id !== userId);
                                } else {
                                    // If user ID is not in likes, add it
                                    newLikes.push(userId);
                                }
                                // Remove user ID from dislikes if present
                                newDislikes = newDislikes.filter(id => id !== userId);
                            } else {
                                // Check if user ID is in dislikes
                                if (newDislikes.includes(userId)) {
                                    // If user ID is in dislikes, remove it
                                    newDislikes = newDislikes.filter(id => id !== userId);
                                } else {
                                    // If user ID is not in dislikes, add it
                                    newDislikes.push(userId);
                                }
                                // Remove user ID from likes if present
                                newLikes = newLikes.filter(id => id !== userId);
                            }

                            return {
                                ...comment,
                                likes: newLikes,
                                dislikes: newDislikes,
                                likeNum: newLikes.length,
                                dislikeNum: newDislikes.length
                            };
                        }
                        return comment;
                    });
                });
            }
        } catch (error) {
            console.error('Error processing the thumbs click:', error);
        }
    };


    //go through when sort require changes
    const handleSortChange = (sortedComments) => {
        setPlaceComments(sortedComments);
    };

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


    return (
        <div className="RatingPage">
            <NavBar />
            <PlaceDetails result={placeDetails} />
            <CommentFilter comments={placeComments} onSortChange={handleSortChange} />
            <CommentList comment={placeComments} onThumbsClick={onThumbsClick} />
            <Footer />
        </div>
    );
}

export default RatingPage;