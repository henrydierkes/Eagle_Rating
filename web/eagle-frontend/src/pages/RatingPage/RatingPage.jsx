import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import ResultsAndFilter from "../../components/subComponents/ResultsAndFilter/ResultsAndFilter.jsx"
import Footer from "../../components/Footer/Footer.jsx";


const results = [
    { id: 1, title: "Result 1", description: "Description for Result 1", rating: 4.5, num_rate: 33 },
    { id: 2, title: "Result 2", description: "Description for Result 2", rating: 3.2, num_rate: 20 },
    { id: 3, title: "Result 3", description: "Description for Result 3", rating: 2.4, num_rate: 5 },
];
function RatingPage() {
    return (
        <div className="RatingPage">
            <NavBar />
            <Footer />
        </div>
    );
}


export default RatingPage;
