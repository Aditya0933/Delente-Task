import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import { useCart } from "../ContextAPI/CartContext";
import ProductCard from "./ProductCard"; // Import the ProductCard component

const CategoryProductContainer = () => {
  const { category } = useParams(); // Get the category from the URL
  const {
    categories,
    categoriesLoading,
    categoriesError,
    products,
    productsLoading,
    productsError,
    updateCategory,
  } = useCart();

  useEffect(() => {
    if (category) {
      updateCategory(category); // Fetch products based on the new category
    }
  }, [category, updateCategory]);

  // Error messages for categories and products
  const renderError = (error, type) => (
    <div className="text-center text-red-600 mb-6">
      <p className="text-lg font-semibold">
        {type} Error: {error}
      </p>
    </div>
  );

  return (
    <div className="py-4 sm:py-6 md:py-8 px-6 sm:px-16 bg-black min-h-screen">
      {/* Category Header */}
      <div className="text-center mb-8 sm:mb-20">
        <div className=" bg-black text-yellow-500 rounded-md shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold font-cursive">
            Category: {category || "No category selected"}
          </h2>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="text-center text-gray-300 mb-10 sm:mb-16">
        <p className="text-lg sm:text-2xl font-light">
          Welcome to our{" "}
          <span className="font-semibold text-yellow-500">{category}</span>{" "}
          category! Explore a diverse range of premium products, handpicked just
          for you. Whether you're looking for the latest trends or timeless
          classics, we’ve got something for everyone. Browse through our
          collection and find your perfect match.
        </p>
      </div>

      {/* Categories Error */}
      {categoriesError && renderError(categoriesError, "Categories")}

      {/* Products Loading */}
      {productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Display skeleton cards for products */}
          {[...Array(12)].map((_, index) => (
            <div key={index} className="w-full">
              <SkeletonLoader />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Products Error */}
          {productsError && renderError(productsError, "Products")}

          {/* Display Products */}
          {products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} /> // Using ProductCard component
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-300 text-lg">
              No products found for the selected category. Try checking back
              later or explore other categories.
            </div>
          )}
        </>
      )}

      {/* Suggestion Section */}
      <div className="text-center mt-16 sm:mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4">
          Looking for something else?
        </h3>
        <p className="text-lg sm:text-xl text-gray-400 mb-8">
          If you're not finding exactly what you're looking for, try exploring
          some of our other categories for a broader selection of top-quality
          products.
        </p>
        <button className="py-2 px-8 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200">
          Explore More Categories
        </button>
      </div>
    </div>
  );
};

export default CategoryProductContainer;
