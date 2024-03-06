import React from "react";
import "./TrendPlaces.css";
import TrendPlace from "../TrendPlace/TrendPlace";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper';

function TrendPlaces() {
  return (
    <div className="TrendPlaces">
      {/* Use Swiper component */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="slide"
      >
        {/* Each SwiperSlide component represents one slide */}
        <SwiperSlide><TrendPlace /></SwiperSlide>
        <SwiperSlide><TrendPlace /></SwiperSlide>
        <SwiperSlide><TrendPlace /></SwiperSlide>
        <SwiperSlide><TrendPlace /></SwiperSlide>
        <SwiperSlide><TrendPlace /></SwiperSlide>
        <SwiperSlide><TrendPlace /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default TrendPlaces;
