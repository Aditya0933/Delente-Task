import React, { useState } from "react";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../ContextAPI/CartContext";
const Header = ({ onSearch, allProducts }) => {
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = debounce((value) => {
    onSearch(value);
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, 600);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProductClick = (product) => {
    setSearch(product.title);
    setFilteredProducts([]);
  };

  return (
    <header className="bg-black text-white py-4 sm:py-6 md:py-8 px-6 sm:px-16 grid sm:grid-cols-[auto,1fr,auto] relative">
      <div className="flex w-full sm:w-auto justify-between items-center">
        <Link to="/" className="text-3xl font-bold mb-4 sm:mb-0">
          <img
            src="https://www.freepnglogos.com/uploads/flipkart-logo-png/flipkart-com-logo-internet-ltd-state-of-kerala-10.png"
            alt="Store Logo"
            className="h-10 sm:h-12 object-contain"
          />
        </Link>

        <div className="sm:hidden flex items-center" onClick={toggleSidebar}>
          <FaBars size={24} className="text-yellow-400 hover:text-yellow-500" />
        </div>
      </div>

      <div
        className={`hidden sm:block relative mb-4 sm:mb-0 ${
          sidebarOpen ? "hidden" : "flex"
        }`}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search Products..."
          className="p-3 text-black w-[90%] rounded sm:w-[60%] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 ease-in-out"
        />

        {search && filteredProducts.length > 0 && (
          <div className="absolute rounded left-0 mt-0 w-full max-h-72 overflow-y-auto z-50">
            <div>
              <ul className="text-left w-[90%] sm:w-[60%] mx-auto">
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-3 bg-yellow-100 text-black transition duration-200 ease-in-out"
                    onClick={() => handleProductClick(product)}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="block"
                      style={{
                        display: "inline-block",
                        maxWidth: "calc(100% - 2rem)",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title.length > 40
                        ? `${product.title.substring(0, 40)}...`
                        : product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div
        className={`hidden sm:flex  items-center space-x-6 ${
          sidebarOpen ? "hidden" : "flex"
        }`}
      >
        <Link
          to="/cart"
          className="text-lg text-yellow-400 hover:text-yellow-500 relative"
        >
          <FaShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-3 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
              {cartItems.length}
            </span>
          )}
        </Link>
        <FaUserCircle size={24} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 right-0 bg-white w-64 h-full shadow-lg z-50 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">Menu</h2>
              <FaTimes
                size={24}
                className="text-black cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
            <div className="flex flex-col mt-4">
              <Link
                to="/cart"
                className="flex items-center py-3 text-black hover:bg-yellow-100"
              >
                <FaShoppingCart size={24} className="mr-4" />
                <span>Cart</span>
              </Link>
              <FaUserCircle size={24} className="mr-4" />
              <span>Profile</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
