import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import SkeletonLoader from "./SkeletonLoader";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=${productsPerPage}&page=${page}`);
      const data = await response.json();
      setProducts(data);
      setAllProducts((prev) => [...prev, ...data]);
      setTotalProducts(24);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  const filteredProducts = searchQuery
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const renderPagination = () => {
    const pagination = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${
              page === i ? "bg-yellow-500 text-black" : "bg-gray-700 text-yellow-400"
            } transition duration-300`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (page > 1) {
        pagination.push(
          <button
            key="previous"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-700 text-yellow-400 rounded transition duration-300"
            aria-label="Previous Page"
          >
            Previous
          </button>
        );
      }

      pagination.push(
        <button
          key={1}
          onClick={() => setPage(1)}
          className={`px-3 py-1 rounded ${
            page === 1 ? "bg-yellow-500 text-black" : "bg-gray-700 text-yellow-400"
          } transition duration-300`}
        >
          1
        </button>
      );

      if (page > 3) {
        pagination.push(
          <span key="ellipsis-start" className="px-3 py-1 text-gray-500">
            ...
          </span>
        );
      }

      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pagination.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${
              page === i ? "bg-yellow-500 text-black" : "bg-gray-700 text-yellow-400"
            } transition duration-300`}
          >
            {i}
          </button>
        );
      }

      if (page < totalPages - 2) {
        pagination.push(
          <span key="ellipsis-end" className="px-3 py-1 text-gray-500">
            ...
          </span>
        );
      }

      pagination.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={`px-3 py-1 rounded ${
            page === totalPages ? "bg-yellow-500 text-black" : "bg-gray-700 text-yellow-400"
          } transition duration-300`}
        >
          {totalPages}
        </button>
      );

      if (page < totalPages) {
        pagination.push(
          <button
            key="next"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-700 text-yellow-400 rounded transition duration-300"
            aria-label="Next Page"
          >
            Next
          </button>
        );
      }
    }

    return pagination;
  };

  return (
    <div className="py-6 px-6 sm:px-16 bg-black min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-yellow-400 text-4xl sm:text-5xl font-bold font-cursive">
          Classic Since Forever
        </h1>
        <p className="text-yellow-400 font-cursive text-lg sm:text-2xl">
          #signifies timeless elegance and lasting quality
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!searchQuery && (
        <div className="flex justify-center items-center mt-8 space-x-3 overflow-hidden">
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default ProductList;
