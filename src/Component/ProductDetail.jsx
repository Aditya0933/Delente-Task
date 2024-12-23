import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../ContextAPI/CartContext";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing product! Highly recommend it.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Great quality, but the delivery was a bit late.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    rating: 5,
    comment: "Exceeded my expectations. Worth every penny!",
  },
  {
    id: 4,
    name: "Chris Brown",
    rating: 3,
    comment: "Good product, but the size was smaller than expected.",
  },
  {
    id: 5,
    name: "Sophia Lee",
    rating: 5,
    comment: "Absolutely love it! Will buy again.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
        position: "top-right",
      });
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-yellow-400">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-yellow-400">
        Product not found.
      </div>
    );
  }

  return (
    <div className="slider-container p-8 sm:p-16 pb-16 bg-black min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-none w-full lg:w-2/5">
          <img
            className="rounded-lg w-full h-80 object-contain transition-transform duration-300 hover:scale-105"
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="lg:ml-8 mt-6 lg:mt-0 flex flex-col justify-between w-full">
          <h2 className="text-4xl font-bold text-yellow-400 mb-2 text-left">{product.title}</h2>
          <div className="mt-4 flex items-center space-x-6">
            <span className="text-3xl font-semibold text-yellow-400 text-left">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition duration-300 text-left"
            >
              Add to Cart
            </button>
          </div>
          <p className="mt-6 text-lg text-gray-300 text-left">{product.description}</p>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Customer Reviews</h3>
        <div
          className="flex overflow-x-scroll scrollbar-hide space-x-6 py-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[250px] bg-gray-800 rounded-lg p-4 scroll-snap-align-start shadow-lg"
            >
              <p className="text-yellow-400 font-bold">{review.name}</p>
              <p className="text-gray-300 text-sm mt-2">{review.comment}</p>
              <p className="text-yellow-300 mt-2">Rating: {review.rating} ⭐</p>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductDetail;