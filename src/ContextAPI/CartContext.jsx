import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

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
