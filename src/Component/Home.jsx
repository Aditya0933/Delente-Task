import React from "react";
import { Link } from "react-router-dom";
import BgVideo from "../IMG/bg_video.mp4";

const Home = () => {
  return (
    <div className="relative text-center h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src={BgVideo}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Background video showing shop theme"
      />
      {/* Overlay for text readability */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center bg-black bg-opacity-70">
        <div className="flex flex-col justify-center items-start border-l-4 border-lime-400 transition rounded-2xl ml-6 sm:ml-0 p-4 pl-4 sm:pl-12">
          {/* Main Heading */}
          <h1 className="text-6xl sm:text-8xl font-bold text-white font-cursive">
            Welcome
          </h1>
          {/* Subheading */}
          <p className="mt-4 text-lg sm:text-4xl font-bold text-white">
            to Aditya's Online Store
          </p>
          {/* Call to Action Button */}
          <p className="mt-4">
            <Link to="/products">
              <button className="animated-button">
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Right arrow"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Go To Products</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Right arrow"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;