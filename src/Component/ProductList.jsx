import React from "react";

const ProductList = ({ products, addToCart }) => {
  const dummyProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      image:
        "https://media.istockphoto.com/id/1129150548/photo/blank-white-lying-watch-with-wristlet-mockup-isolated-side-view.webp?a=1&s=612x612&w=0&k=20&c=eqNPvlStKxyCKMqldRm0znUtV2hRAJMnlRmKWk5Dk00=",
    },
    {
      id: 3,
      name: "Product 3",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 4,
      name: "Product 4",
      price: 25.0,
      image:
        "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 5,
      name: "Product 5",
      price: 12.5,
      image:
        "https://images.unsplash.com/photo-1524289286702-f07229da36f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    },
    {
      id: 6,
      name: "Product 6",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1522273500616-6b4757e4c184?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8",
    },
    {
      id: 7,
      name: "Product 7",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ1fHx8ZW58MHx8fHx8",
    },
    {
      id: 8,
      name: "Product 8",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1511300961358-669ca3ad05af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQyfHx8ZW58MHx8fHx8",
    },
    {
      id: 9,
      name: "Product 9",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1613803745791-04b7aba7cd49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDcwfHx8ZW58MHx8fHx8",
    },
    {
      id: 10,
      name: "Product 10",
      price: 27.5,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwMnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 11,
      name: "Product 11",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1615306119247-67565da835da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwMHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 12,
      name: "Product 12",
      price: 29.5,
      image:
        "https://images.unsplash.com/photo-1633793566063-52465a148cc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1NHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 13,
      name: "Product 13",
      price: 14.99,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/y/c/7/9-rso420-9-red-tape-blue-white-original-imah3fuheuggxgjm.jpeg?q=70",
    },
    {
      id: 14,
      name: "Product 14",
      price: 17.0,
      image:
        "https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3Nnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 15,
      name: "Product 15",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1516294584662-84ee41f957c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwM3x8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 bg-gray-50">
      {dummyProducts.map((product) => (
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
                <svg
                  className="w-4 h-4 text-yellow-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                5.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              <a
              onClick={() => addToCart(product)}
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
