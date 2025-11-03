import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
      navigate('/login');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClass = (path) => {
    return `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
    }`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Product Management
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/products" className={navLinkClass('/products')}>
              Products
            </Link>
            <Link to="/categories" className={navLinkClass('/categories')}>
              Categories
            </Link>
            <Link to="/bulk-upload" className={navLinkClass('/bulk-upload')}>
              Bulk Upload
            </Link>
            <Link to="/reports" className={navLinkClass('/reports')}>
              Reports
            </Link>
            <button
              onClick={handleLogout}
              className="btn-danger ml-4 px-4 py-2"
            >
              Logout
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="md:hidden btn-danger px-3 py-2 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
