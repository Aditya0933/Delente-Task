import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CategoryProductContainer = () => {
  const { category } = useParams(); // Grabbing the category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true); // To trigger the API call only once on initial render

  // Fetch products based on the selected category
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Set to false after the first render
      return; // Skip the first render
    }

    const fetchProducts = async () => {
      if (!category) {
        console.log("No category specified.");
        setProducts([]);
        setLoading(false);
        return;
      }

      console.log("Fetching products for category:", category); // Log category before API request
      setLoading(true);
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log("Data received:", data); // Log the data to confirm API response

        const adaptedProducts = data.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
        }));

        setProducts(adaptedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Depend on the category from the URL

  return (
    <div className="p-6 bg-black pt-[30px] sm:pt-[40px] min-h-screen">
      <div className="text-center mb-4 py-8 sm:py-20">
        <div className="p-4 bg-black text-lime-400 rounded-md">
          <h2 className="text-2xl font-bold">Category: {category || "No category selected"}</h2>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin text-lime-400 text-4xl"><AiOutlineLoading3Quarters /></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-sm bg-lime-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`} className="block"> {/* Link to product detail page */}
                <img
                  className="p-4 rounded-t-lg h-60 w-80 mx-auto object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div className="px-4 pb-4">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-800">
                    {product.name}
                  </h5>
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-300 text-lg">
          No products found for the selected category.
        </div>
      )}
    </div>
  );
};

export default CategoryProductContainer;