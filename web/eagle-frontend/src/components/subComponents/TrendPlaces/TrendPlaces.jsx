import React, {useRef} from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";

function TrendPlaces() {
    const slideRef = useRef(null);

    const scrollRight = () => {
        if (slideRef.current) {
            let lists = slideRef.current.querySelectorAll('.TrendPlace');
            slideRef.current.appendChild(lists[0]);
        }
    };

    const scrollLeft = () => {
        if (slideRef.current) {
            let lists = slideRef.current.querySelectorAll('.TrendPlace');
            slideRef.current.prepend(lists[lists.length - 1]);
        }
    };
    return (
            <div className="TrendPlaces">
                <div className="buttons">
                    <button id="prev" onClick={scrollLeft}><i className="fas fa-angle-left" style={{ fontSize: '24px' }}></i></button>
                    <button id="next" onClick={scrollRight}><i className="fas fa-angle-right" style={{ fontSize: '24px' }}></i></button>
                </div>
                <div className="slide" ref={slideRef}>
                    <TrendPlace name="Place 1" />
                    <TrendPlace name="Place 2" />
                    <TrendPlace name="Place 3" />
                    <TrendPlace name="Place 4" />
                    <TrendPlace name="Place 5" />
                </div>
        </div>
    );
}
export default TrendPlaces;
