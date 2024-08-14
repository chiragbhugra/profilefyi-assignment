import React from "react";
import useCartStore from "../store/cartStore";

const CategoryFilter = ({ onCategoryChange }) => {
  const { categories } = useCartStore();

  return (
    <div className="flex items-center justify-end mb-4">
      <label htmlFor="category-filter" className="mr-2 font-medium text-gray-700">
        Filter:
      </label>
      <select
        id="category-filter"
        onChange={(e) => onCategoryChange(e.target.value)}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        style={{ width: '150px' }}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;