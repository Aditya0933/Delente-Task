import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  if (cartItems.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500">Your cart is empty.</p>
        <p>
          Click here to
          <Link to="/products" className="text-blue-500 underline">
            add products
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="border-b p-4 flex items-center">
          <a href="#">
            <img
              className="p-4 rounded-lg h-40 w-40 object-cover"
              src={item.image}
              alt={item.name}
            />
          </a>
          <div className="ml-4 flex-grow">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <div className="mt-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-green-500 text-white px-2 py-1 mr-2"
              >
                +
              </button>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-red-500 text-white px-2 py-1 mr-2"
                disabled={item.quantity === 1}
              >
                -
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-gray-500 text-white px-2 py-1"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
