import React, { useEffect, useRef } from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
import $ from "jquery"; // Import jQuery if not already done
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick';

const images = [
    {url: "images/Woodruff_Library.jpeg", name: 'Woodruff Library', rating: 4.9},
    {url: "images/cand.jpeg", name: 'Candler', rating: 2.3},
    {url: "images/oxford.jpeg", name: 'Oxford Library', rating: 3.3},
    {url: "images/candler.jpeg", name: 'Candler Library', rating: 4.3},
    {url: "images/campus_background.jpeg", name: 'Campus', rating: 1.2},
    {url: "images/convocation-hall.png", name: 'Convocation Hall', rating: 0.9},
    {url: "images/entrance.jpeg", name: 'Entrance', rating: 0.0},
    {url: "images/sign.jpeg", name: 'Sign', rating: 3.3},
    {url: "images/building.jpeg", name: 'Some Building', rating: 5.0},
    {url: "images/quad.jpeg", name: 'Quad', rating: 1.2}
];

function TrendPlaces() {
    const slider = React.useRef(null);
    const settings = {
        dot:false,
        centerMode: true,
        speed:300,
        infinite: true,
        slidesToShow: 5,
        arrows: false,
        autoplay: false,
    };
    return (
        <div className="TrendPlaces">
            <div className="buttons">
                <button className="prev" onClick={() => slider?.current?.slickPrev()}>
                    <i className="fas fa-angle-left" style={{ fontSize: "24px" }}></i>
                </button>
                <button className="next"  onClick={() => slider?.current?.slickNext()}>
                    <i className="fas fa-angle-right" style={{ fontSize: "24px" }}></i>
                </button>
            </div>
            <div className="masks">
                <div className="leftMask mask">
                </div>
                <div className="rightMask mask">
                </div>
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
