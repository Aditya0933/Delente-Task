import React, { createContext, useState } from "react";

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // State for the selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to update the selected category
  const updateCategory = (category) => {
    setSelectedCategory(category);
    console.log("CartContext Updated", category);
  };

  return (
    <CartContext.Provider
      value={{
        selectedCategory,
        updateCategory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
