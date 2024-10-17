import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Welcome to the Shop</h1>
      <p className="mt-4">
        <Link to="/products" className="text-blue-500 underline">
          Browse Products
        </Link>
      </p>
    </div>
  );
};

export default Home;
