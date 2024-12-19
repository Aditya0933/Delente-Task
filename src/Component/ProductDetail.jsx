import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin text-lime-400 text-4xl">
          <AiOutlineLoading3Quarters />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen bg-black text-lime-400">Product not found.</div>;
  }

  return (
    <div className="slider-container h-100vh p-[100px] sm:p-[150px] bg-black">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-none w-full lg:w-2/5">
          <img
            className="rounded-lg w-full h-80 object-cover"
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="lg:ml-8 mt-6 lg:mt-0 flex flex-col justify-between w-full">
          <h2 className="text-4xl text-left font-bold text-lime-400 mb-2">
            {product.title}
          </h2>

          <div className="mt-4 flex items-center space-x-6">
            <span className="text-3xl font-semibold text-lime-400">
              ${product.price}
            </span>
            <button className="px-6 py-2 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-500 transition duration-300">
              Add to Cart
            </button>
          </div>

          <p className="mt-6 text-lg text-gray-300 text-left">{product.description}</p>

          <div className="mt-8 text-sm text-gray-400 text-left">
            <p>
              <strong>Brand:</strong> {product.brand || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating.rate} ⭐ (
              {product.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
