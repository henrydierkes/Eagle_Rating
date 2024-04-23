import React, { useEffect, useRef, useState } from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import axios from "axios";
import axiosConfig from "../../../axiosConfig.jsx";

function TrendPlaces() {
    const slider = useRef(null);
    const [slidesToShow, setSlidesToShow] = useState(6);
    const [trendyPlaces, setTrendyPlaces] = useState([]);
    const [placeImages, setPlaceImages] = useState({});

    // Update the number of slides to show based on the window width
    const updateSlidesToShow = () => {
        const screenWidth = window.innerWidth;
        const slides = Math.min(Math.max(1, Math.floor(screenWidth / 200)), 6);
        setSlidesToShow(slides);
    };

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    // Fetch trendy places and their images
    useEffect(() => {
        // Define an async function inside useEffect to handle the async logic
        const fetchTrendyPlacesAndImages = async () => {
            try {
                // Fetch trendy places
                const response = await axios.get(`${axiosConfig.baseURL}/api/place/getTrendy`);
                const places = response.data;
                setTrendyPlaces(places);

                // Fetch images for each place in parallel
                const fetchImagesPromises = places.map(async (place) => {
                    try {
                        const imageResponse = await axios.get(`${axiosConfig.baseURL}/api/place/${place.locIdStr}/images`);
                        if (imageResponse.data.length > 0) {
                            // Store the first image URL as the cover image for the current place
                            const firstImageUrl = imageResponse.data[0];
                            setPlaceImages((prevImages) => ({
                                ...prevImages,
                                [place.locIdStr]: `${axiosConfig.baseURL}${firstImageUrl}`,
                            }));
                        }
                    } catch (error) {
                        console.error(`Error fetching images for place ${place.locIdStr}:`, error);
                    }
                });

                // Use Promise.all to wait for all image fetching to complete
                await Promise.all(fetchImagesPromises);
            } catch (error) {
                console.error('Error fetching trendy places:', error);
            }
        };

        // Call the async function
        fetchTrendyPlacesAndImages();
    }, [axiosConfig.baseURL]);

    // Settings for the carousel
    const settings = {
        dots: false,
        centerMode: true,
        speed: 300,
        infinite: true,
        slidesToShow,
        arrows: false,
        autoplay: false,
    };

    // Render the component
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
                    {trendyPlaces.map(place => {
                        console.log(place);
                        // Determine the image URL for the current place
                        const imageUrl = placeImages[place.locIdStr] || 'images/building.jpeg'; // Default image URL if no image found

                        // Render the TrendPlace component for each place
                        return (
                            <TrendPlace
                                key={place.locIdStr}
                                placeName={place.locName}
                                imageUrl={imageUrl}
                                placeRating={place.averageRating ? place.averageRating.overall.toFixed(1) : "N/A"}
                                locId={place.locIdStr}
                            />
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}

export default TrendPlaces;
