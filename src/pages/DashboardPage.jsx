import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsCount, categoriesCount] = await Promise.all([
        productService.getCount(),
        categoryService.getCount()
      ]);

      setStats({
        totalProducts: productsCount.total || productsCount.count || 0,
        totalCategories: categoriesCount.total || categoriesCount.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Products</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Categories</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalCategories}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Quick Actions</h3>
              <div className="space-y-2 mt-4">
                <a
                  href="/products"
                  className="block text-blue-500 hover:text-blue-700"
                >
                  Manage Products →
                </a>
                <a
                  href="/categories"
                  className="block text-green-500 hover:text-green-700"
                >
                  Manage Categories →
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
