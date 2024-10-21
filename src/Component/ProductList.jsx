import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import "swiper/css";

const ProductList = ({ addToCart }) => {
  const [dummyProducts, setDummyProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(true); // Loading state
  const itemsPerPage = 8; // Items per page (can be adjusted)

  // Fetch products on component mount
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
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // In case of error, stop loading
      }
    };

    fetchProducts();
  }, []);

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (typeof addToCart === "function") {
      addToCart(product);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Filter products based on search query
  const filteredProducts = currentItems.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(dummyProducts.length / itemsPerPage);

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
      <div className="text-start">
        <h2 className="text-lime-400 text-lg sm:text-xl font-semibold font-sans mb-2">
          Search Item By Name:
        </h2>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-lime-400 bg-transparent rounded-lg p-2 w-full outline-none text-lime-400"
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-lime-400 text-4xl" />
        </div>
      ) : (
        <>
          {/* Check if no products found */}
          {filteredProducts.length === 0 ? (
            <div className="text-center text-lime-400 font-semibold">
              Could not find any products.
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-full max-w-sm bg-lime-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                          5.0
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination Controls */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-lime-400 text-white rounded-lg disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 sm:px-4 py-2 rounded-lg ${
                      currentPage === page
                        ? "bg-lime-500 text-white"
                        : "bg-lime-400 text-white"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-3 py-2 sm:px-4 sm:py-2 bg-lime-400 text-white rounded-lg disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
