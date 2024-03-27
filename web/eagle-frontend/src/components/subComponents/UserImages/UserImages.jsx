import React, { useState } from 'react';
import './UserImages.css';
import fakedata1 from '../../../../public/images/fakedata1.png';
import fakedata2 from '../../../../public/images/fakedata2.png';
import fakedata3 from '../../../../public/images/fakedata3.png';
import fakedata4 from '../../../../public/images/fakedata4.png';
import fakedata5 from '../../../../public/images/fakedata5.png';

const UserImages = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        fakedata1,
        fakedata2,
        fakedata3,
        fakedata4,
        fakedata5,
    ];

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
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={index === currentIndex ? 'active' : 'inactive'} // 使用 'inactive' 类是可选的，取决于你是否需要特定的样式
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
