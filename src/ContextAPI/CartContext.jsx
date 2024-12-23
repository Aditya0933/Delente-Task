import React, { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../Hooks/useFetch";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { data: categories, loading, error } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  const updateCategory = (category) => {
    console.log("Category selected:", category);
    setSelectedCategory(category);
  };

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProductsByCategory = async (category) => {
    setProductsLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await response.json();
      setProducts(data);
      setProductsLoading(false);
    } catch (error) {
      setProductsError(error.message);
      setProductsLoading(false);
    }
  };

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalCost = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems,
        totalCost,
        clearCart,
        categories,
        loading,
        error,
        updateCategory,
        selectedCategory,
        products,
        fetchProductsByCategory,
        productsLoading,
        productsError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };