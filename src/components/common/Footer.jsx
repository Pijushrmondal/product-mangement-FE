import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Product Management</h3>
            <p className="text-sm">
              Efficiently manage your products, categories, and inventory with our comprehensive management system.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-white transition-colors">
                  Categories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Copyright</h3>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Product Management System.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>Built with React & NestJS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
