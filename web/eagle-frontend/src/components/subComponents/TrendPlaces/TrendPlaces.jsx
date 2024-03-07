import React, { useEffect, useRef } from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
import $ from "jquery"; // Import jQuery if not already done
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick';

const images = [
    "images/Woodruff_Library.jpeg",
    "images/cand.jpeg",
    "images/oxford.jpeg",
    "images/candler.jpeg",
    "images/campus_background.jpeg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

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
                {images.map((image, index) => (
          <TrendPlace key={index} name={`Place ${index + 1}`} imageUrl={image} />
        ))}
                </Slider>
            </div>
        </div>
    );
}
export default TrendPlaces;
