import React from 'react';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <div className="card group hover:scale-[1.02] transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              {category.name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(category)}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm transition-colors"
            title="Edit category"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium text-sm transition-colors"
            title="Delete category"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      
      {category.description && (
        <p className="text-gray-600 mb-3">{category.description}</p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {category.createdAt && (
            <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
          )}
        </div>
        {category.uniqueId && (
          <span className="text-xs text-gray-400 font-mono">
            ID: {category.uniqueId.slice(0, 8)}
          </span>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
