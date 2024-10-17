import React, { useEffect, useState } from "react";
import "swiper/css";

const ProductList = ({ addToCart }) => {
  const [dummyProducts, setDummyProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    // Get cart items from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If the item does not exist in the cart, add it with a quantity of 1
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage

    // Call the addToCart prop function to reflect changes in the parent
    if (typeof addToCart === "function") {
      addToCart(product); // Notify the parent component
    }
  };

  // Filter products based on the search query
  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-black pt-[100px] sm:pt-[150px] min-h-screen">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-lime-400 bg-transparent rounded-lg p-2 w-full outline-none text-lime-400"
        />
      </div>

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
    </div>
  );
};

export default ProductList;
