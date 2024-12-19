import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [dummyProducts, setDummyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const adaptedProducts = data.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
        }));
        setDummyProducts(adaptedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-black pt-[30px] sm:pt-[40px] min-h-screen">
      <div className="text-center mb-4 py-8 sm:py-20">
        <h1 className="text-lime-400 text-4xl sm:text-5xl font-bold font-cursive">
          Classic Since Forever
        </h1>
        <p className="text-lime-400 font-cursive text-lg sm:text-3xl">
          #signifies timeless elegance and lasting quality
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin text-lime-400 text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-12 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6v12h16V6H4z"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-sm bg-lime-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  className="p-4 rounded-t-lg h-60 w-80 mx-auto object-cover"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="px-4 pb-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-800">
                    {product.name}
                  </h5>
                </Link>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;