import React from 'react';
import { blogCategories } from '@/data/blog';

interface BlogCategoryFilterProps {
  activeCategory?: string;
  onSelect: (category: string | null) => void;
}

export const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({ 
  activeCategory, 
  onSelect 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Topics
      </button>
      {blogCategories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onSelect(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="mr-1">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default BlogCategoryFilter;
