import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { allBlogPosts, blogCategories } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSearchBar } from '@/components/blog/BlogSearchBar';
import { BlogCategoryFilter } from '@/components/blog/BlogCategoryFilter';
import { Helmet } from '@/components/seo/Helmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Blog = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let posts = allBlogPosts;

    // Filter by category
    if (category) {
      const categoryData = blogCategories.find(c => c.slug === category);
      if (categoryData) {
        posts = posts.filter(post => post.category === categoryData.name);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
        );
      });
    }

    return posts;
  }, [category, searchQuery]);

  const categoryName = category
    ? blogCategories.find(c => c.slug === category)?.name
    : null;

  return (
    <>
      <Helmet 
        title={categoryName ? `${categoryName} Articles | CWT Blog` : 'Water Treatment Blog | Community Water Test'}
        description="Expert articles on water quality, testing, softeners, filtration systems, and home water treatment solutions."
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Knowledge Hub</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {categoryName || 'Water Treatment Blog'}
              </h1>
              
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Expert insights on water quality, testing, and treatment solutions for your home
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Search and Filter */}
              <div className="mb-8 space-y-4">
                <div className="max-w-md">
                  <BlogSearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
                <BlogCategoryFilter 
                  activeCategory={category} 
                  onSelect={(cat) => {
                    // Navigate handled by router
                    window.location.href = cat ? `/blog/category/${cat}` : '/blog';
                  }} 
                />
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  {categoryName ? ` in ${categoryName}` : ''}
                </p>
              </div>

              {/* Blog Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or browse all categories
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
