import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BgVideo from "../IMG/bg_video.mp4";
import { useCart } from "../ContextAPI/CartContext";

const Home = () => {
  const { categories, loading, error } = useCart();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products/category/${category}`);
  };

  return (
    <div className="relative text-center h-screen overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <video
        src={BgVideo}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Background video showing shop theme"
      />

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white bg-black bg-opacity-60 p-8 sm:p-12 md:p-16 lg:p-24">
        <div className="text-center mb-8 px-8 py-12 rounded-lg shadow-xl bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-cursive tracking-wide">
            Shop & Save
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold">
            Where quality meets affordability, just for you.
          </p>
          <Link to="/products">
            <button className="mt-6 inline-flex items-center px-8 py-4 font-semibold shadow-xl bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 text-yellow-100 border-2 border-yellow-500 rounded-full group hover:bg-gradient-to-r hover:from-yellow-500 group-hover:via-yellow-400 group-hover:to-yellow-300 transition-all duration-1000">
              <span className="mr-2">Explore Products</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19l7-7-7-7"></path>
                <path d="M5 12h14"></path>
              </svg>
            </button>
          </Link>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
            Explore All Our Categories
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            Explore a diverse range of categories, each offering something new
            for you.
          </p>

          {loading ? (
            <div className="text-yellow-400 mt-6">Loading categories...</div>
          ) : error ? (
            <div className="text-red-400 mt-6">{error}</div>
          ) : (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {(categories || []).map((category) => (
                <div
                  key={category}
                  className="bg-black text-yellow-400 border border-yellow-500 rounded-lg px-2 sm:px-4 py-2 text-center cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-300"
                  onClick={() => handleCategoryClick(category)}
                >
                  <span className="font-semibold text-sm sm:text-md capitalize whitespace-nowrap">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;