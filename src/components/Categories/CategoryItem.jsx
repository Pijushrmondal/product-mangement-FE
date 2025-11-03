import React from 'react';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(category)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      {category.description && (
        <p className="text-gray-600 mb-2">{category.description}</p>
      )}
      {category.createdAt && (
        <p className="text-sm text-gray-400">
          Created: {new Date(category.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default CategoryItem;

