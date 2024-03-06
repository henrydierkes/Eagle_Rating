import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx"
import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx"
import CommentList from "../../components/CommentList/CommentList.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import "./RatingPage.css"
import DetailRating from "../../components/subComponents/detailRating/DetailRating.jsx";


const results = [
    { id: 1, title: "Place 567", description: "Description for Result 1", rating: 4.5, num_rate: 33, location: '1400 Emory Street', top_tags: ['tables', 'chairs'],
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

function RatingPage() {
    return (
        <div className="RatingPage">
            <NavBar />
            <PlaceDetails results={results}/>
            <DetailRating results={results}/>
            <CommentFilter />
            <CommentList/>
            <Footer />
        </div>
    );
}


export default RatingPage;
