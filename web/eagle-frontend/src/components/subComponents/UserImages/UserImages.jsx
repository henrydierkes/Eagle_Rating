import React, {useEffect, useState} from 'react';
import './UserImages.css';
import fakedata1 from '../../../../public/images/fakedata1.jpeg';
import fakedata2 from '../../../../public/images/fakedata2.jpeg';
import fakedata3 from '../../../../public/images/fakedata3.jpeg';
import fakedata4 from '../../../../public/images/fakedata4.jpeg';
import fakedata5 from '../../../../public/images/fakedata5.jpeg';
import axiosConfig from "../../../axiosConfig.jsx";
import axios from "axios";

const UserImages = ({placeId}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    // const images = [
    //     fakedata1,
    //     fakedata2,
    //     fakedata3,
    //     fakedata4,
    //     fakedata5,
    // ];
    const fetchImageUrls = async () => {
        try {
            const config = {
                ...axiosConfig,
                timeout: 30000, // Set the timeout to 30 seconds (30000 milliseconds)
            };
            const response = await axios.get(`/api/place/${placeId}/images`, config);
            console.log('Response:', response);
            if (response.status !== 200) {
                throw new Error('Failed to fetch image URLs');
            }
            const imageIdPaths = response.data;
            const fullImageUrls = imageIdPaths.map(imagePath => `${axiosConfig.baseURL}${imagePath}`);
            console.log('Full Image URLs:', fullImageUrls);
            setImages(fullImageUrls);
        } catch (error) {
            console.error('Error fetching image URLs:', error);
        }
    };
    useEffect(() => {
        fetchImageUrls();
    }, [placeId]);


    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="user-images">
            <button className="arrow-btn prev" onClick={goToPrevious}>
                &#8249;
            </button>
            <div className="images-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image} // Use the individual image URL
                        alt={`Image ${index + 1}`}
                        className={index === currentIndex ? 'active' : 'inactive'} // Use 'active' or 'inactive' class based on the index
                        style={{ display: index === currentIndex ? 'block' : 'none' }} // Conditionally display the image
                    />
                ))}
            </div>

            <button className="arrow-btn next" onClick={goToNext}>
                &#8250;
            </button>
        </div>
    );
};

export default UserImages;
