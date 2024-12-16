"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[800px]">
            <img
              src="/image/banner1.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 text-center">
              <h2 className="text-white text-xl sm:text-2xl lg:text-5xl text-justify font-bold mb-2">
                Discover Stories That Captivate Your Imagination
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-2xl text-center p-10">
                Dive into a world of compelling characters, thrilling plots, and
                unforgettable journeys. Explore our collection of novels across
                every genre, from timeless classics to modern masterpieces.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[800px]">
            <img
              src="/image/banner2.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 text-center">
              <h2 className="text-white text-xl sm:text-2xl lg:text-5xl text-justify font-bold mb-2">
                Your Next Great Read Awaits
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-2xl text-center p-10">
                Lose yourself in the pages of our handpicked novels. Whether you
                love romance, mystery, fantasy, or drama, we have the perfect
                story for every reader.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[800px]">
            <img
              src="/image/banner3.webp"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 text-center">
              <h2 className="text-white text-xl sm:text-2xl lg:text-5xl text-justify font-bold mb-2">
                Unleash the Power of Words
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-2xl text-center p-10">
                Explore the magic of storytelling. Our curated library features
                novels that inspire, entertain, and leave a lasting impact.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[800px]">
            <img
              src="/image/banner4.jpg"
              alt="Slide 4"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 text-center">
              <h2 className="text-white text-xl sm:text-2xl lg:text-5xl text-justify font-bold mb-2">
                Read. Imagine. Escape.
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-2xl text-center p-10">
                Step into new worlds and escape the everyday. With our
                ever-growing selection of novels, the adventure begins with
                every page you turn.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
