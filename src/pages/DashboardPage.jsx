import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [response] = await Promise.all([categoryService.getCount()]);

      setStats({
        totalProducts: response.productCount || 0,
        totalCategories: response.categoryCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      color: "blue",
      icon: "📦",
      link: "/products",
    },
    {
      title: "Total Categories",
      value: stats.totalCategories,
      color: "green",
      icon: "📁",
      link: "/categories",
    },
    {
      title: "Quick Actions",
      color: "purple",
      icon: "⚡",
      actions: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your product management system
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className="card group hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{card.icon}</div>
                    {card.color === "blue" && (
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                    )}
                    {card.color === "green" && (
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                      </div>
                    )}
                    {card.color === "purple" && (
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {card.title}
                  </h3>
                  {card.value !== undefined && (
                    <p
                      className={`text-4xl font-bold text-${card.color}-600 mb-4`}
                    >
                      {card.value}
                    </p>
                  )}
                  {card.link && (
                    <Link
                      to={card.link}
                      className={`text-${card.color}-600 hover:text-${card.color}-700 font-medium inline-flex items-center group`}
                    >
                      View Details
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  )}
                  {card.actions && (
                    <div className="space-y-3 mt-4">
                      <Link
                        to="/products"
                        className="block btn-primary text-center py-2"
                      >
                        Manage Products
                      </Link>
                      <Link
                        to="/categories"
                        className="block btn-secondary text-center py-2"
                      >
                        Manage Categories
                      </Link>
                      <Link
                        to="/bulk-upload"
                        className="block text-center py-2 text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Bulk Upload →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Recent Activities
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    System initialized and ready
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Dashboard loaded successfully
                  </div>
                </div>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Products</span>
                    <span className="font-bold text-blue-600">
                      {stats.totalProducts}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-bold text-green-600">
                      {stats.totalCategories}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
