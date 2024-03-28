// import React, { useState } from 'react';
// import './ResultList.css';
// import { useNavigate } from "react-router-dom";
//
// const getRatingColor = (averageRating) => {
//     if (averageRating >= 4) {
//         return 'linear-gradient(to right, #5ea5fc, #6379fe)'; /* Gradient background */; // green
//     } else if (averageRating >= 3) {
//         return '#CDDC39'; // lime
//     } else if (averageRating >= 2) {
//         return '#FFC107'; // amber
//     } else {
//         return '#F44336'; // red
//     }
// };
//
// const ResultList = ({ results }) => {
//     const [highlights, setHighlights] = useState({});
//     const navigate = useNavigate();
//
//     const handleAddLocationClick = () => {
//         navigate('/addLocation'); // Navigate to the add location page
//     };
//
//     const toggleHighlight = (index) => {
//         setHighlights(prevHighlights => ({
//             ...prevHighlights,
//             [index]: !prevHighlights[index]
//         }));
//     };
//
//     return (
//         <div className="result-list">
//             {results.map((result, index) => (
//                 <div key={result.locId || index} className="result-item">
//                     <div
//                         className="rating-box"
//                         style={{ backgroundColor: getRatingColor(result.averageRating?.overall) }}
//                     >
//                         <span className="rating-number">{result.averageRating?.overall.toFixed(1)}</span>
//                     </div>
//                     <div
//                         className="highlight-tag"
//                         style={{
//                             position: 'absolute',
//                             top: 0,
//                             right: 0,
//                             backgroundColor: highlights[index] ? '#FFEB3B' : 'transparent',
//                             cursor: 'pointer',
//                             padding: '5px'
//                         }}
//                         onClick={() => toggleHighlight(index)}
//                     >
//                         {'☆'}
//                     </div>
//                     <div>
//                         <h3>{result.locName}</h3>
//                         <p className="description">{result.ratingCount + " ratings"}</p>
//                     </div>
//                 </div>
//             ))}
//             <button className="rating-button" onClick={handleAddLocationClick}>Add Location</button>
//         </div>
//     );
// };
//
// export default ResultList;
import React, { useState } from 'react';
import './ResultList.css';
import { useNavigate } from "react-router-dom";

const getRatingColor = (averageRating) => {
    if (averageRating >= 4) {
        return 'linear-gradient(to right, #5ea5fc, #6379fe)'; // Gradient background for high ratings
    } else if (averageRating >= 3) {
        return '#CDDC39'; // Lime for average ratings
    } else if (averageRating >= 2) {
        return '#FFC107'; // Amber for low ratings
    } else {
        return '#F44336'; // Red for very low ratings
    }
};

const ResultList = ({ results }) => {
    console.log(results)
    const [highlights, setHighlights] = useState({});
    const navigate = useNavigate();

    const handleAddLocationClick = () => {
        navigate('/addLocation'); // Navigate to the add location page
    };

    const toggleHighlight = (index) => {
        setHighlights(prevHighlights => ({
            ...prevHighlights,
            [index]: !prevHighlights[index]
        }));
    };

    // Function to navigate to the details page of a location
    const navigateToLocationDetail = (locationId) => {
        console.log("Navigating to locationId:", locationId);
        navigate(`/ratingpage/${locationId}`);
    };

    return (
        <div className="result-list">
            {results.map((result, index) => (
                <div key={result.locationId || index} className="result-item" onClick={() => navigateToLocationDetail(result.locationId)}>
                    <div
                        className="rating-box"
                        style={{ backgroundColor: getRatingColor(result.averageRating?.overall) }}
                    >
                        <span className="rating-number">{result.averageRating?.overall.toFixed(1)}</span>
                    </div>
                    <div
                        className="highlight-tag"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: highlights[index] ? '#FFEB3B' : 'transparent',
                            cursor: 'pointer',
                            padding: '5px'
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click from triggering the parent's onClick
                            toggleHighlight(index);
                        }}
                    >
                        {'☆'}
                    </div>
                    <div>
                        <h3>{result.locName}</h3>
                        <p className="description">{result.ratingCount + " ratings"}</p>
                    </div>
                </div>
            ))}
            <button className="rating-button" onClick={handleAddLocationClick}>Add Location</button>
        </div>
    );
};

export default ResultList;

