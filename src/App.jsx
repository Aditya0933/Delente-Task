import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import ProductList from "./Component/ProductList";
import Cart from "./Component/Cart";
import CategoryProductContainer from "./Component/CategoryProductContainer";
import ProductDetail from "./Component/ProductDetail";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} allProducts={allProducts} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList searchQuery={searchQuery} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/category/:category" element={<CategoryProductContainer />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;