import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="slider-container h-100vh p-[100px] sm:p-[250px] pb-[200px] bg-black">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-none w-full lg:w-2/5 mb-6 lg:mb-0">
          <div className="skeleton-image bg-gray-400 rounded-lg w-full h-80"></div>
        </div>
        <div className="lg:ml-8 flex flex-col justify-between w-full">
          <div className="skeleton-text bg-gray-400 rounded w-1/3 h-8 mb-4"></div>
          <div className="flex items-center space-x-6 mb-4">
            <div className="skeleton-text bg-gray-400 rounded w-20 h-6"></div>
            <div className="skeleton-button bg-gray-400 rounded-full w-32 h-10"></div>
          </div>
          <div className="skeleton-text bg-gray-400 rounded w-full h-4 mb-2"></div>
          <div className="skeleton-text bg-gray-400 rounded w-1/2 h-4 mb-2"></div>
          <div className="skeleton-text bg-gray-400 rounded w-1/4 h-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
