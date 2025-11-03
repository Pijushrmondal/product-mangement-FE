import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CategoryList from '../components/Categories/CategoryList';
import CategoryForm from '../components/Categories/CategoryForm';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { categoryService } from '../services/categoryService';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 10;

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchQuery]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      let data;
      if (searchQuery.trim()) {
        const response = await categoryService.search(searchQuery, currentPage, limit);
        data = response.data || response;
        setTotalPages(response.totalPages || response.total ? Math.ceil(response.total / limit) : 1);
      } else {
        const response = await categoryService.getAll(currentPage, limit);
        data = response.data || response;
        setTotalPages(response.totalPages || response.total ? Math.ceil(response.total / limit) : 1);
      }
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert(error.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, formData);
      } else {
        await categoryService.create(formData);
      }
      setShowForm(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert(error.response?.data?.message || 'Failed to save category');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Categories</h1>
            <p className="text-gray-600">Manage your product categories</p>
          </div>
          <button
            onClick={handleCreate}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Category
          </button>
        </div>
        
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} placeholder="Search categories..." />
        </div>
        
        {showForm && (
          <div className="mb-8">
            <CategoryForm
              category={editingCategory}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingCategory(null);
              }}
            />
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : categories.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search query' : 'Get started by creating your first category'}
            </p>
            {!searchQuery && (
              <button onClick={handleCreate} className="btn-primary">
                Create Category
              </button>
            )}
          </div>
        ) : (
          <>
            <CategoryList
              categories={categories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
