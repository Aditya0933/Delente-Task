import React from "react";
import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";
import { useCart } from "../ContextAPI/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cartItems, addToCart, updateQuantity, removeFromCart, totalItems, totalCost, clearCart } = useCart();

  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, quantity);
    toast.success("Quantity updated!");
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.error("Item removed from cart!");
  };

  const handleClearCart = () => {
    clearCart();
    toast.info("Cart cleared!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-black pt-[100px] sm:pt-[150px] min-h-screen flex flex-col items-center">
        <p className="text-center text-yellow-500 text-xl flex items-center gap-2">
          Your cart is empty. <FaRegSadTear className="text-4xl" />
        </p>
        <p className="text-yellow-500 mt-4">
          Click here to
          <Link to="/products">
            <button className="animated-button mt-4">Go To Products</button>
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black text-yellow-100 min-h-screen">
      <h2 className="text-3xl sm:text-5xl text-yellow-400 font-bold font-cursive">
        My Cart
      </h2>

      <div className="text-2xl sm:text-3xl font-bold mt-6 font-cursive">
        Total Items : <span className="text-yellow-400">{totalItems}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold mt-2 font-cursive mb-16">
        Total Cost :{" "}
        <span className="text-yellow-400">${totalCost.toFixed(2)}</span>
      </div>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border-b p-2 sm:p-4 flex items-center justify-center"
        >
          <div>
            <a href="#">
              <img
                className="p-4 rounded-lg h-40 min-w-32 max-w-32 sm:w-40 object-cover right-0"
                src={item.image}
                alt={item.name}
              />
            </a>
          </div>
          <div className="ml-4 flex-grow text-start">
            <h3 className="text-sm sm:text-xl font-bold">{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity || 1}</p>
            <div className="mt-2">
              <button
                onClick={() =>
                  handleUpdateQuantity(item.id, (item.quantity || 1) + 1)
                }
                className="bg-yellow-500 text-white px-2 sm:px-3 py-1 mr-2 rounded-lg font-bold text-2xl"
              >
                +
              </button>
              <button
                onClick={() =>
                  handleUpdateQuantity(item.id, (item.quantity || 1) - 1)
                }
                className="bg-yellow-500 text-white px-2 sm:px-3 py-1 mr-2 rounded-lg font-bold text-2xl"
                disabled={(item.quantity || 1) === 1}
              >
                -
              </button>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-gray-500 text-white px-2 sm:px-3 py-1 mr-2 rounded-lg text-xl"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-6 py-2 rounded-lg text-xl"
        >
          Clear Cart
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Cart;