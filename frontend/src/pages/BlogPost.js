import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogPost, getBlogPosts } from '@/lib/api';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const [postData, allPostsData] = await Promise.all([
        getBlogPost(slug),
        getBlogPosts()
      ]);
      
      setPost(postData);
      
      // Get related posts from same category
      const related = allPostsData
        .filter(p => p.slug !== slug && p.category === postData.category)
        .slice(0, 3);
      setRelatedPosts(related);
    } catch (e) {
      console.error('Error fetching blog post:', e);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog')}
            className="mb-6 text-gray-600 hover:text-midnight"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Button>
          
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-signal-green/10 text-signal-green rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-midnight mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <User size={18} />
              <span className="font-medium">{post.author}</span>
              {post.author_role && <span className="text-sm">• {post.author_role}</span>}
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={18} />
              <span>{formatDate(post.published_at)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium mb-8">{post.excerpt}</p>
            <div className="text-gray-700 whitespace-pre-wrap">{post.content}</div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={18} className="text-gray-500" />
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight mb-12 text-center">Related Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-neon-teal hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                >
                  {relatedPost.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedPost.featured_image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-midnight mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Expert Guidance?</h2>
          <p className="text-xl text-gray-300 mb-8">Let's discuss how we can help accelerate your regulatory success.</p>
          <Button 
            onClick={() => navigate('/contact')} 
            className="bg-signal-green hover:bg-signal-green/90 text-midnight font-bold px-8 py-6 text-lg rounded-full"
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
