import React, { useState } from 'react';
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
    const [highlights, setHighlights] = useState({}); // 用于存储每个结果的高亮状态

    // 切换高亮状态的函数
    const toggleHighlight = (index) => {
        setHighlights(prevHighlights => ({
            ...prevHighlights,
            [index]: !prevHighlights[index]
        }));
    };

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
                        onClick={() => toggleHighlight(index)}
                    >
                        {'☆'}
                    </div>
                    <div>
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                        <p className="description">{result.num_rate + " ratings"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResultList;