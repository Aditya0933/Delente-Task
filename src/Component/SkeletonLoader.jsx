import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-sm bg-lime-50 border border-gray-200 rounded-lg mx-auto shadow-md animate-pulse">
      <div className="w-full h-60 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="text-right relative">
          <p className="h-4 absolute right-0 bg-gray-300 rounded text-right w-1/3"></p>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
