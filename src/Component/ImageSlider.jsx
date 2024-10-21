import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Ensure this import is correct
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Navigation styles
import "swiper/css/pagination"; // Import Pagination styles
import Banner1 from "../IMG/banner-1.jpg";

const ImageSlider = () => {
  const slides = [
    {
      id: 1,
      image:"https://images.pexels.com/photos/5935754/pexels-photo-5935754.jpeg?auto=compress&cs=tinysrgb&w=1600",
      caption: "Welcome to Our Store!",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/919453/pexels-photo-919453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      caption: "Discover Amazing Products!",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg?auto=compress&cs=tinysrgb&w=1600",
      caption: "Limited Time Offers!",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/5869617/pexels-photo-5869617.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        caption: "Exclusive Deals Just for You!",
    },
  ];

  return (
    <div className="slider-container pt-[100px] sm:pt-[150px] bg-black">
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        loop={true} // Enable infinite scrolling
        modules={[Navigation, Pagination]}
        className="mySwiper rounded-[50px] sm:rounded-[160px] rounded-bl-[50px] sm:rounded-bl-[0px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-[70vh] object-cover"
              />
              <div className="absolute bottom-[20px] left-[20px] bg-black bg-opacity-50 rounded-3xl text-white p-4">
                <h2 className="text-xl">{slide.caption}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Navigation Buttons */}
        <div className="swiper-button-next text-lime-400 rounded-full shadow-md"></div>
        <div className="swiper-button-prev text-lime-400 rounded-full shadow-md"></div>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
