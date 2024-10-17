import React, { useEffect, useState } from "react";

const ProductList = ({ addToCart }) => {
  const [dummyProducts, setDummyProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        
        // Adapt the response to your desired structure
        const adaptedProducts = data.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
        }));
        setDummyProducts(adaptedProducts);
        // Store products in localStorage
        localStorage.setItem("products", JSON.stringify(adaptedProducts));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Check if products exist in localStorage
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      // If products exist, load from localStorage
      setDummyProducts(JSON.parse(storedProducts));
    } else {
      // If not, fetch the products from the API
      fetchProducts();
    }
  }, []);

  // Filter products based on the search query
  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <a href="#">
              <img
                className="p-4 rounded-t-lg h-60 w-80 mx-auto"
                src={product.image}
                alt={product.name}
              />
            </a>
            <div className="px-4 pb-4">
              <a href="#">
                <h5 className="text-lg font-semibold tracking-tight text-gray-800">
                  {product.name}
                </h5>
              </a>
              <div className="flex items-center mt-2 mb-3">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {/* Repeat star SVGs based on rating */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
