import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx"
import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx"
import CommentList from "../../components/CommentList/CommentList.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import "./RatingPage.css"
import DetailRating from "../../components/subComponents/detailRating/DetailRating.jsx";


const results = [
    { id: 1, title: "Place 567", description: "Description for Result 1", rating: 4.5, num_rate: 33, location: '1400 Emory Street',
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
        building: 'Building A', floor: '2nd floor'},
];

const comments = [
    {
      id: 1,
      user: {
        name: "John Doe",
        profilePicture: "../../../public/images/bleachamongus.png",
      },
      datePosted: "2024-03-06",
      overallRating: 4.5,
      specificRatings: {
        size: 4,
        cleanliness: 5,
        quiet: 3,
      },
      upvotes: 10,
      downvotes: 2,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at convallis magna. Aenean ultricies eros ac lectus fermentum, quis volutpat elit fermentum.",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        profilePicture: "https://example.com/profile.jpg",
      },
      datePosted: "2024-03-05",
      overallRating: 3.8,
      specificRatings: {
        size: 3,
        cleanliness: 4,
        quiet: 4,
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
