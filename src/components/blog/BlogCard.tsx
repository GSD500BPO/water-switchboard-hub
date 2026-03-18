import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blog/types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.slug}`}>
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-blog.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
              <span className="text-4xl">💧</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
