import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || ''
      });
    }
  }, [category]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          {category ? '✏️' : '➕'}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {category ? 'Edit Category' : 'Create New Category'}
        </h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter category name"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="btn-primary flex-1"
        >
          {category ? 'Update Category' : 'Create Category'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
