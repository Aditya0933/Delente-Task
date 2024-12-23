import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const truncatedDescription =
    product.description.length > 120
      ? product.description.substring(0, 120) + "..."
      : product.description;

  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg mx-auto cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative w-full h-auto">
        <div className="w-auto h-64 mx-auto rounded-t-lg overflow-hidden">
          <img
            className="w-full mx-auto h-full object-contain transition-transform duration-500 ease-in-out transform hover:scale-110"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </div>

        <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-60 text-white px-4 py-2 rounded-md">
          <span className="text-xl font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-gray-800">{product.name}</span>
          <span className="text-xl font-bold text-yellow-500">${product.price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{truncatedDescription}</p>
        <button className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;