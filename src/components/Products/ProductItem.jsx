import React from "react";

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-blue-600 mt-1">
            ${product.price}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      {product.description && (
        <p className="text-gray-600 mb-2">{product.description}</p>
      )}
      {product.category && (
        <p className="text-sm text-gray-500 mb-2">
          Category:{" "}
          <span className="font-semibold">{product.category.name}</span>
        </p>
      )}
      <div className="flex justify-between items-center mt-4">
        {product.createdAt && (
          <p className="text-sm text-gray-400">
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
