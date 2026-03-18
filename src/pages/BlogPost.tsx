import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Helmet } from '@/components/seo/Helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

// Parse markdown-like content to React elements
const renderContent = (text: string): React.ReactNode => {
  if (!text) return null;

  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    // Headers
    if (line.startsWith('## ')) {
      nodes.push(
        <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
      return;
    }

    // Lists
    if (line.trim().startsWith('- ')) {
      nodes.push(
        <li key={index} className="ml-6 mb-2 text-gray-700">
          {line.trim().substring(2)}
        </li>
      );
      return;
    }

    // Empty line
    if (line.trim() === '') {
      return;
    }

    // Regular paragraph
    nodes.push(
      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
        {line}
      </p>
    );
  });

  return nodes;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.id, post.category, 3);

  return (
    <>
      <Helmet 
        title={`${post.title} | CWT Blog`}
        description={post.excerpt}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Article Header */}
        <article className="bg-white">
          {/* Hero Image */}
          <div className="aspect-[21/9] bg-gray-100 relative overflow-hidden">
            {post.image ? (
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-blog.jpg';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
                <span className="text-8xl">💧</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 -mt-20 relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Back Link */}
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-white mb-6 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Article Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {/* Category */}
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                  {post.category}
                </span>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                {/* Introduction */}
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                {/* Content Sections */}
                <div className="prose prose-lg max-w-none">
                  {post.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                      <div className="text-gray-700 leading-relaxed">
                        {renderContent(section.content)}
                      </div>
                      
                      {section.subsections?.map((sub, subIndex) => (
                        <div key={subIndex} className="mt-6 ml-4">
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            {sub.title}
                          </h3>
                          <div className="text-gray-700 leading-relaxed">
                            {renderContent(sub.content)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-12 pt-8 border-t">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
