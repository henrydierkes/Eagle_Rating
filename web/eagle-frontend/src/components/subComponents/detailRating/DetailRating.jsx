import React from 'react';
import './DetailRating.css';
import RatingBar from "../RatingBar/RatingBar.jsx";


const DetailRating = ({ results }) => {


        return (
            <div className="DetailRating">
                <RatingBar results={results}/>
            </div>
        );
}

export default DetailRating;
