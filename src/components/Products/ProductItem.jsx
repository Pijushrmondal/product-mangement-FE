import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="card group hover:scale-[1.02] transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-extrabold text-blue-600">
              ${product.price?.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm transition-colors"
            title="Edit product"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium text-sm transition-colors"
            title="Delete product"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      
      {product.image && (
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {product.description && (
        <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {product.category && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            📁 {product.category.name}
          </span>
        )}
        {product.createdAt && (
          <span className="text-xs text-gray-500">
            {new Date(product.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
