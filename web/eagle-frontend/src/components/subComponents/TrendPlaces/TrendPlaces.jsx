import React, { useEffect, useRef, useState } from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
import $ from "jquery"; // Import jQuery if not already done
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick';

const images = [
    {url: "images/Woodruff_Library.jpeg", name: 'Woodruff Library', rating: 4.9},
    {url: "images/cand.jpeg", name: 'Candler', rating: 4.6},
    {url: "images/oxford.jpeg", name: 'Oxford Library', rating: 4.7},
    {url: "images/candler.jpeg", name: 'Candler Library', rating: 4.3},
    {url: "images/campus_background.jpeg", name: 'Campus', rating: 4.5},
    {url: "images/convocation-hall.png", name: 'Convo Hall', rating: 4.8},
    {url: "images/entrance.jpeg", name: 'Entrance', rating: 4.3},
    {url: "images/sign.jpeg", name: 'Sign', rating: 4.5},
    {url: "images/building.jpeg", name: 'Some Building', rating: 5.0},
    {url: "images/quad.jpeg", name: 'Quad', rating: 4.2}
];

function TrendPlaces() {
    const slider = useRef(null);

    // State to hold the current value of slidesToShow
    const [slidesToShow, setSlidesToShow] = useState(6);

    // Adjust slidesToShow based on screen width
    const updateSlidesToShow = () => {
        const screenWidth = window.innerWidth;
        // Calculate number of slides based on screen width, with a maximum of 6
        let slides = Math.min(Math.max(1, Math.floor(screenWidth / 200)), 6);
        setSlidesToShow(slides);
    };

    useEffect(() => {
        // Call once to set initial state
        updateSlidesToShow();

        // Add event listener for window resize
        window.addEventListener('resize', updateSlidesToShow);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const settings = {
        dot: false,
        centerMode: true,
        speed: 300,
        infinite: true,
        slidesToShow: slidesToShow,
        arrows: false,
        autoplay: false,
    };

    return (
        <div className="TrendPlaces">
            <div className="buttons">
                <button className="prev" onClick={() => slider.current?.slickPrev()}>
                    <i className="fas fa-angle-left" style={{ fontSize: "24px" }}></i>
                </button>
                <button className="next" onClick={() => slider.current?.slickNext()}>
                    <i className="fas fa-angle-right" style={{ fontSize: "24px" }}></i>
                </button>
            </div>
            <div className="SliderContainer">
                <Slider ref={slider} {...settings}>
                    {images.map(({ url, name, rating }, index) => (
                        <TrendPlace key={index} placeName={name} imageUrl={url} placeRating={rating} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default TrendPlaces;