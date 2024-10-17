import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Component/Home";
import ProductList from "./Component/ProductList";
import Cart from "./Component/Cart";
import { FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logo from "./IMG/BrandLogo.png";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from session storage on component mount
    return JSON.parse(sessionStorage.getItem("cartItems")) || [];
  });

  // For mobile menu toggle
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Update session storage whenever cartItems changes
  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems;
      if (existingItem) {
        // If the item already exists, increase the quantity
        updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast(`${product.name} quantity increased to ${existingItem.quantity + 1}`);
      } else {
        // If the item does not exist, add it to the cart
        const newItem = { ...product, quantity: 1 };
        updatedItems = [...prevItems, newItem];
        toast(`${newItem.name} added to cart`);
      }
      return updatedItems;
    });
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      toast("Item removed from cart");
      return updatedItems;
    });
  };

  // Update the quantity of a cart item
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent quantity from being less than 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    toast(`Quantity updated to ${quantity}`);
  };

  // Calculate total items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      {/* Header */}
      <header className="absolute z-40 w-full text-white py-4 px-4 sm:px-10 bg-transparent">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold">
            <img src={Logo} alt="Shop Logo" className="h-16 sm:h-28 sm:w-32 mr-2" />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden z-50">
            <button className="text-3xl focus:outline-none" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes className="text-lime-400 z-500" /> : <FaBars className="text-lime-400" />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <Link to="/" className="ml-8 font-semibold text-2xl font-cursive hover:text-lime-400 transition">
              Home
            </Link>
            <Link to="/products" className="ml-8 font-semibold text-2xl font-cursive hover:text-lime-400 transition">
              Products
            </Link>
            <Link to="/cart" className="ml-8 font-semibold text-2xl font-cursive hover:text-lime-400 transition">
              Cart ({totalItems})
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
                className="text-2xl font-cursive py-2 hover:text-lime-400 transition"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-2xl font-cursive py-2 hover:text-lime-400 transition"
                onClick={toggleMobileMenu}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="text-2xl font-cursive py-2 hover:text-lime-400 transition"
                onClick={toggleMobileMenu}
              >
                Cart ({totalItems})
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
        </Routes>
      </main>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Footer */}
      <footer className="bg-black text-lime-400 text-center w-full pt-6 pb-2">
        <p className="flex items-center justify-center gap-2 font-cursive">
          Made by Aditya Singh Parihar with <FaHeart className="text-red-400" />
        </p>
      </footer>
    </Router>
  );
}

export default App;
