import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Component/Home";
import ProductList from "./Component/ProductList";
import Cart from "./Component/Cart";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHome,
  FaBoxOpen,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logo from "./IMG/BrandLogo.png";
import { FaRegUserCircle } from "react-icons/fa";
import CategoryProductContainer from "./Component/CategoryProductContainer";
import ProductDetail from "./Component/ProductDetail";

function App() {
  // For mobile menu toggle
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      {/* Header */}
      <header className="absolute z-40 w-full text-white py-4 px-4 sm:px-10 bg-black">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold">
            <img
              src={Logo}
              alt="Shop Logo"
              className="h-16 sm:h-28 sm:w-32 mr-2"
            />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden z-50">
            <button
              className="text-3xl focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-lime-400 z-500" />
              ) : (
                <FaBars className="text-lime-400" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <Link
              to="/"
              className="ml-8 font-semibold text-2xl font-cursive flex items-center hover:text-lime-400 transition"
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/products"
              className="ml-8 font-semibold text-2xl font-cursive flex items-center hover:text-lime-400 transition"
            >
              <FaShoppingCart className="mr-2" /> Cart
            </Link>
            <Link
              to="/myprofilepage"
              className="ml-8 font-semibold text-2xl font-cursive flex items-center hover:text-lime-400 transition"
            >
              <FaRegUserCircle className="mr-2" />
            </Link>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed pt-8 top-0 right-0 h-full w-2/3 bg-black text-white transform ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <div className="flex flex-col items-start p-8">
              <Link
                to="/"
                className="text-2xl font-cursive py-2 flex items-center hover:text-lime-400 transition"
                onClick={toggleMobileMenu}
              >
                <FaHome className="mr-2" /> Home
              </Link>
              <Link
                to="/products"
                className="text-2xl font-cursive py-2 flex items-center hover:text-lime-400 transition"
                onClick={toggleMobileMenu}
              >
                <FaBoxOpen className="mr-2" /> Products
              </Link>
              <Link
                to="/cart"
                className="text-2xl font-cursive py-2 flex items-center hover:text-lime-400 transition"
                onClick={toggleMobileMenu}
              >
                <FaShoppingCart className="mr-2" /> Cart
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <div className="">
                <ProductList />
              </div>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/products/category/:category"
            element={<CategoryProductContainer />}
          ></Route>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-black text-lime-400 text-center w-full pt-6 pb-2">
        <p className="flex items-center justify-center gap-2 font-cursive">
          Delente Technology Task
        </p>
      </footer>
    </Router>
  );
}

export default App;
