import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BlogSection = ({ blogPosts }) => {
  const defaultBlogPosts = [
    {
      id: "blog1",
      title: "The Future of AI Agents in Business Automation",
      excerpt: "Discover how intelligent AI agents are revolutionizing business operations and what it means for your company's competitive edge.",
      category: "AI & Automation",
      author: "Lumis Team",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
      status: "coming_soon"
    },
    {
      id: "blog2",
      title: "DevOps Best Practices for Startups",
      excerpt: "Essential DevOps strategies that help startups scale efficiently while maintaining reliability and security.",
      category: "DevOps",
      author: "Lumis Team",
      image_url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600",
      status: "coming_soon"
    },
    {
      id: "blog3",
      title: "Database Optimization: A Complete Guide",
      excerpt: "Learn proven techniques to optimize your database performance and reduce costs without compromising data integrity.",
      category: "Database",
      author: "Lumis Team",
      image_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600",
      status: "coming_soon"
    }
  ];

  const displayBlogPosts = blogPosts.length > 0 ? blogPosts : defaultBlogPosts;

  return (
    <section id="blog" className="py-24 md:py-32 relative" data-testid="blog-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="text-[#7F5AF0] font-medium text-sm uppercase tracking-wider mb-4 block">
              Insights & Updates
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              From the <span className="text-accent-gradient">Lumis Blog</span>
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Stay ahead with expert insights on AI, automation, DevOps, and the latest 
              technology trends.
            </p>
          </div>
          
          <Link to="/blog" data-testid="view-all-blog-btn">
            <Button 
              variant="outline"
              className="rounded-full border-[rgba(255,255,255,0.2)] text-white hover:bg-[#0F0F11] hover:border-[#7F5AF0]"
            >
              View All Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogPosts.map((post, index) => (
            <Link 
              to={`/blog/${post.id}`}
              key={post.id}
              className={`blog-card group card-glow animate-fade-in-up stagger-${index + 1}`}
              data-testid={`blog-card-${post.id}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {post.status === "coming_soon" && (
                  <div className="absolute inset-0 bg-[#050505]/60 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#7F5AF0]/80 text-white text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-[#7F5AF0]" />
                  <span className="text-[#7F5AF0] text-xs font-medium uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-[#7F5AF0] transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
                  <span className="text-[#94A3B8] text-xs">{post.author}</span>
                  <ArrowRight className="w-4 h-4 text-[#7F5AF0] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Section line */}
      <div className="section-line mt-24 md:mt-32"></div>
    </section>
  );
};
