import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgVideo from "../IMG/bg_video.mp4";
import { CartContext } from "../ContextAPI/CartContext";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { updateCategory } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    updateCategory(category);
    navigate(`/products/category/${category}`);
  };

  return (
    <div className="relative text-center h-screen overflow-hidden">
      <video
        src={BgVideo}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Background video showing shop theme"
      />

      <div className="relative z-10 h-full flex flex-col justify-center items-center bg-black bg-opacity-70">
        <div className="flex flex-col justify-center items-start border-l-4 border-lime-400 transition rounded-2xl ml-6 sm:ml-0 p-4 pl-4 sm:pl-12">
          <h1 className="text-6xl sm:text-8xl font-bold text-white font-cursive">
            Welcome
          </h1>
          <p className="mt-4 text-lg sm:text-4xl font-bold text-white">
            to Store
          </p>
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
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-lime-400 text-2xl font-bold">All Categories</h2>
          <p className="text-gray-300 text-sm mt-1">
            Explore a variety of products curated just for you.
          </p>

          {loading ? (
            <div className="text-lime-400 mt-4">Loading categories...</div>
          ) : (
            <div className="flex flex-wrap gap-4 mt-4">
              {categories.map((category) => (
                <span
                  key={category}
                  className="text-lime-400 bg-black border border-lime-400 rounded-full px-4 py-2 text-sm hover:bg-lime-400 hover:text-black transition duration-200 cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;