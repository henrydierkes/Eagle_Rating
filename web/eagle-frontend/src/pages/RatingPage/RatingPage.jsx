import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx"
import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx"
import CommentList from "../../components/CommentList/CommentList.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import "./RatingPage.css"
import DetailRating from "../../components/subComponents/detailRating/DetailRating.jsx";


const results = [
    { id: 1, title: "Shared Study Room A", description: "Description for Result 1", rating: 4.5, num_rate: 33, location: '1960 N Druid Hills Rd, Atlanta, GA 30322',
        top_tags: ['tables', 'chairs', 'restroom'],
        details: {
            cleanliness: {
                name: "Cleanliness",
                rating: 4.5,
            },
            service: {
                name: "Service",
                rating: 4.0,
            },
            location: {
                name: "Location",
                rating: 5.0,
            },
        },
        building: 'Goizueta Business School\'s Library', floor: '2nd floor'},
];

const comments = [
    {
      id: 1,
      user: {
        name: "John Doe",
        profilePicture: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png",
      },
      datePosted: "2024-03-06",
      overallRating: 4.5,
      specificRatings: {
        sizeRating: 4,
        cleanlinessRating: 5,
        quietnessRating: 3,
      },
      upvotes: 10,
      downvotes: 2,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at convallis magna. Aenean ultricies eros ac lectus fermentum, quis volutpat elit fermentum.",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        profilePicture: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png",
      },
      datePosted: "2024-03-05",
      overallRating: 3.8,
      specificRatings: {
        sizeRating: 3,
        cleanlinessRating: 4,
        quietnessRating: 4,
      },
      upvotes: 5,
      downvotes: 1,
      comment: "Sed malesuada arcu a suscipit malesuada. Sed tincidunt massa ut nisi scelerisque, non aliquam lorem ullamcorper.",
    },
    // Add more comments as needed
  ];

function RatingPage() {
    return (
        <div className="RatingPage">
            <NavBar />
            <PlaceDetails results={results}/>
            <hr className="divider" /> 
            <CommentFilter />
            <CommentList comments={comments}/>
            <Footer />
        </div>
    );
}


export default RatingPage;
