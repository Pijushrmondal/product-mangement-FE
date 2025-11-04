import React from "react";

const ProductItem = ({ product, onEdit, onDelete, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="card group hover:bg-gray-50 transition-all duration-200">
        <div className="flex items-center gap-4">
          {product.image && (
            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-1">{product.description}</p>
                )}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xl font-extrabold text-blue-600">
                    ${Number(product.price).toFixed(2) || "0.00"}
                  </span>
                  {product.category && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
              
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm transition-colors whitespace-nowrap"
                  title="Edit product"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium text-sm transition-colors whitespace-nowrap"
                  title="Delete product"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="card group hover:scale-[1.02] transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-extrabold text-blue-600">
              ${Number(product.price).toFixed(2) || "0.00"}
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
              e.target.style.display = "none";
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
