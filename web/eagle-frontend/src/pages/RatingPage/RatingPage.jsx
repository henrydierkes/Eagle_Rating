import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails.jsx"
import CommentFilter from "../../components/CommentFilter/CommentFilter.jsx"
import CommentList from "../../components/CommentList/CommentList.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import "./RatingPage.css"


const results = [
    { id: 1, title: "Place 567", description: "Description for Result 1", rating: 4.5, num_rate: 33, location: '1400 Emory Street', top_tags: ['table', 'chair'], size: 5, clean: 5, quiet: 5, building: 'Building A', floor: '2nd floor'},
];

function RatingPage() {
    return (
        <div className="RatingPage">
            <NavBar />
            <PlaceDetails results={results}/>
            <CommentFilter />
            <CommentList/>
            <Footer />
        </div>
    );
}


export default RatingPage;
