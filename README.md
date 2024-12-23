Shopping Website with React, Vite, and TailwindCSS
This is a shopping website built with React, Vite, and TailwindCSS. The website fetches product data from an API and displays it across different pages. Users can add products to their cart, save it, and view products by category. The application also utilizes various features such as debouncing, Context API, Skeleton UI for loading states, lazy loading of images, and React Toastify for notifications.

Features
React + Vite: Fast development setup with hot module replacement (HMR) for quick updates.
TailwindCSS: Utility-first CSS framework for fast and responsive design.
Custom Hooks: Custom React hooks for managing various states, including fetching data and form handling.
Context API: Global state management to handle cart data and categories across the app.
Debouncing: Used to delay API calls for search or filter inputs to reduce unnecessary requests.
React Toastify: Notifications for actions like adding items to the cart, successful operations, or errors.
Add to Cart: Users can add products to the cart, which persists across pages. Cart data is stored locally and can be saved for later.
Category Filtering: Products can be filtered based on categories, and the corresponding products are displayed dynamically.
Product Pages: Displays product details, images, prices, and other relevant information fetched from the API.
API Integration: Fetches product data from an external API and displays it in the app.
Responsive Design: Mobile-first design that ensures a great experience on all devices.
Skeleton UI: Provides a smooth loading experience by showing placeholder content while data is being fetched, improving the user experience.
Lazy Loading of Images: Images are lazily loaded to improve page load performance, ensuring faster initial loading and reduced resource consumption.
Deployment: The app is deployed on Vercel for easy hosting and scaling.
