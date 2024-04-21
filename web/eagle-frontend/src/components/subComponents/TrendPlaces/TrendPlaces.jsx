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

    const updateSlidesToShow = () => {
        const screenWidth = window.innerWidth;
        let slides = Math.min(Math.max(1, Math.floor(screenWidth / 200)), 6);
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
        axios.get(`${axiosConfig.baseURL}/api/place/getTrendy`)
            .then(response => {
                const places = response.data;
                setTrendyPlaces(places);

                // Fetch images for each place
                places.forEach(place => {
                    axios.get(`${axiosConfig.baseURL}/api/place/${place.locIdStr}/images`)
                        .then(response => {
                            // Store the images in placeImages state using placeId as the key
                            setPlaceImages(prevImages => ({
                                ...prevImages,
                                [place.locIdStr]: response.data
                            }));
                        })
                        .catch(error => {
                            console.error(`Error fetching images for place ${place.locIdStr}:`, error);
                        });
                });
            })
            .catch(error => {
                console.error('Error fetching trendy places:', error);
            });
    }, []);

    const settings = {
        dots: false,
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
                {trendyPlaces.map(place => {
    // Determine the image URL from the placeImages state
    const images = placeImages[place.locIdStr];
    let imageUrl = 'images/building.jpeg'; // Default image
    if (images && images.length > 0) {
        if (images[0] instanceof Blob) {
            imageUrl = URL.createObjectURL(images[0]);
        } else {
            // Assuming images[0] is a path or URL
            imageUrl = images[0];
        }
    }

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
