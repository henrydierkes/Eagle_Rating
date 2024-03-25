import React, { useEffect, useRef, useState } from "react";
import "./categoryList.css";
import CategoryItem from "../categoryItem/categoryItem";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

function CategoryList({ categories }) {
    const slider = useRef(null);

    // State to hold the current value of slidesToShow
    const [slidesToShow, setSlidesToShow] = useState(5);

    // Adjust slidesToShow based on screen width
    const updateSlidesToShow = () => {
        const screenWidth = window.innerWidth;
        // Calculate number of slides based on screen width, with a maximum of 5
        let slides = Math.min(Math.max(1, Math.floor(screenWidth / 200)), 5);
        setSlidesToShow(slides);
    };

    useEffect(() => {
        // Initialize slidesToShow
        updateSlidesToShow();

        // Update slidesToShow on window resize
        window.addEventListener('resize', updateSlidesToShow);

        // Cleanup event listener
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    const settings = {
        dots: false,
        centerMode: true,
        speed: 300,
        infinite: true,
        slidesToShow: slidesToShow,
        arrows: false,
        autoplay: false,
        swipe: true, // Enable swipe functionality
        draggable: true, // Allow users to drag (with mouse click) through the slides
    };

    return (
        <div className="CategoryList">
            <div className="buttons">
                <button className="prev" onClick={() => slider.current?.slickPrev()}>
                    <i className="fas fa-angle-left" style={{ fontSize: "24px" }}></i>
                </button>
                <button className="next" onClick={() => slider.current?.slickNext()}>
                    <i className="fas fa-angle-right" style={{ fontSize: "24px" }}></i>
                </button>
            </div>
            <div className="masks">
                <div className="leftMask mask"></div>
                <div className="rightMask mask"></div>
            </div>
            <div className="SliderContainer">
                <Slider ref={slider} {...settings}>
                    {categories.map((category, index) => (
                        <CategoryItem key={index} name={category.category} imageUrl={category.url} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default CategoryList;