import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <nav className="flex gap-4">
            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="/products" className="text-gray-600 hover:text-gray-800">Products</a>
            <a href="/categories" className="text-gray-600 hover:text-gray-800">Categories</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

