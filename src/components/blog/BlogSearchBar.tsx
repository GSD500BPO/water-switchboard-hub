import React from 'react';
import { Search } from 'lucide-react';

interface BlogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const BlogSearchBar: React.FC<BlogSearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default BlogSearchBar;
