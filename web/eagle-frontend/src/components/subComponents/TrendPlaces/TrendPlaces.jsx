import React, { useEffect, useRef } from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
import $ from "jquery"; // Import jQuery if not already done
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';

function TrendPlaces() {
    const slideRef = useRef(null);
    const slickRef = useRef(null);

    useEffect(() => {
        const slideElement = slideRef.current;
        if (slideElement) {
            const slickInstance = $(slideElement).slick({
                dots: false,
                arrows: true,
                slidesToShow: 5,
                infinite: false,
            });

            slickRef.current = slickInstance;

            return () => {
                if (slickInstance) {
                    slickInstance.slick('unslick');
                }
            };
        }
    }, [slideRef.current]);


    const scrollRight = () => {
        if (slideRef.current) {
            jQuery(slideRef.current).slick("slickNext");
        }
    };

    const scrollLeft = () => {
        if (slideRef.current) {
            jQuery(slideRef.current).slick("slickPrev");
        }
    };

    return (
        <div className="TrendPlaces">
            <div className="buttons">
                <button id="prev" onClick={scrollLeft}>
                    <i className="fas fa-angle-left" style={{ fontSize: "24px" }}></i>
                </button>
                <button id="next" onClick={scrollRight}>
                    <i className="fas fa-angle-right" style={{ fontSize: "24px" }}></i>
                </button>
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
