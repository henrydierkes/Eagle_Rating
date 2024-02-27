import React from 'react';
import './ResultList.css';

const getRatingColor = (rating) => {
    if (rating >= 4) {
        return '#4CAF50'; // green
    } else if (rating >= 3) {
        return '#CDDC39'; // lime
    } else if (rating >= 2) {
        return '#FFC107'; // amber
    } else {
        return '#F44336'; // red
    }
};

const ResultList = ({ results }) => {
    return (
        <div className="result-list">
            {results.map((result, index) => (
                <div key={index} className="result-item">
                    <div
                        className="rating-box"
                        style={{ backgroundColor: getRatingColor(result.rating) }} // 设置背景颜色
                    >
                        <span className="rating-number">{result.rating}</span>
                    </div>
                    <p className="rating-description-outside"></p> {/* 在这里添加您的小字 */}
                    <div>
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                        <p className="description">{result.num_rate + " ratings"}</p>
                    </div>0
                </div>
            ))}
        </div>
    );
};

export default ResultList;

