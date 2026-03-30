import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Footer from '../components/layout/footer';
import { Search, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Blog } from '../types/blog';
import { getBlogs } from '../services/blog-service';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

  // Fetch blogs from JSON
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Extract unique categories from blogs
  const categories = ['All', ...Array.from(new Set(blogPosts.flatMap(post => post.categories)))];

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null ||
      selectedCategory === 'All' ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 8,
        delay: 0.05 * i
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    },
    tap: { scale: 0.98 }
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Trigger card animations after header is loaded
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setAnimateCards(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        {/* Premium Atmospheric Depth Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#5dd7e6]/[0.05] blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-zinc-500/[0.03] blur-[180px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-12"
              >
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="h-px bg-gradient-to-r from-transparent via-[#5dd7e6]/50 to-transparent mb-8 mx-auto w-1/3"
                />
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-6xl font-extrabold text-center mb-8 relative"
                >
                  <span className="bg-gradient-to-r from-white via-[#5dd7e6] to-white/40 bg-clip-text text-transparent animate-gradient-x tracking-tight">
                    Insights & Expertise
                  </span>
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-zinc-500 text-center max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                  Strategic insights on data architecture, machine learning experiments, and the evolution of high-performance digital solutions.
                </motion.p>

                {/* Search and filter section */}
                <motion.div
                  variants={itemVariants}
                  className="max-w-3xl mx-auto mb-16 glass-card p-2 rounded-2xl md:rounded-full border border-white/5 bg-white/[0.01] shadow-2xl relative z-20"
                >
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" size={16} />
                      <input
                        type="text"
                        placeholder="Search the archive..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-5 py-3 rounded-full border border-transparent bg-white/[0.02] text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-[#5dd7e6]/30 outline-none transition-all text-sm font-light"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <select
                        value={selectedCategory || 'All'}
                        onChange={(e) => setSelectedCategory(e.target.value === 'All' ? null : e.target.value)}
                        className="w-full md:w-auto px-6 py-3 rounded-full border border-transparent bg-white/[0.02] text-zinc-400 focus:ring-1 focus:ring-[#5dd7e6]/30 outline-none transition-all text-sm font-medium cursor-pointer hover:bg-white/5"
                      >
                        {categories.map(category => (
                          <option key={category} value={category} className="bg-[#0e0e0e] text-white">{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {animateCards && filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 flex flex-col h-full bg-white/[0.01] hover:border-[#5dd7e6]/20 transition-all duration-500 group"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <motion.img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/0 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {post.categories.map(category => (
                        <span
                          key={category}
                          className="px-2.5 py-1 bg-[#5dd7e6]/10 text-[#5dd7e6] text-[10px] font-bold tracking-widest uppercase rounded-md border border-[#5dd7e6]/30 backdrop-blur-md shadow-[0_0_15px_rgba(93,215,230,0.1)]"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-7 flex-grow flex flex-col relative">
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4 space-x-5">
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="mr-2 h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 flex-grow text-white group-hover:text-[#5dd7e6] transition-colors duration-300 leading-tight tracking-tight">{post.title}</h3>
                    <p className="text-zinc-500 mb-6 text-sm font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <a
                      href={post.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5dd7e6] hover:text-white transition-colors duration-300 flex items-center gap-2 text-xs font-bold uppercase tracking-wider group/btn mt-auto"
                    >
                      <span className="relative pb-0.5 border-b border-transparent group-hover/btn:border-[#5dd7e6] transition-all">Deep Read</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-semibold mb-2">No posts found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Newsletter subscription */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-24 glass-card rounded-3xl p-10 md:p-16 relative overflow-hidden border border-white/5 bg-white/[0.01]"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#5dd7e6]/10 rounded-full blur-[100px]"></div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-zinc-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-white">Subscribe to the Insight Layer</h3>
              <p className="text-zinc-500 mb-10 max-w-xl mx-auto font-light leading-relaxed">
                Join a curated list of professionals receiving strategic updates on data engineering and digital performance.
              </p>

              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="flex-grow px-6 py-4 rounded-full border border-white/10 bg-white/[0.02] text-white focus:ring-1 focus:ring-[#5dd7e6]/30 outline-none text-sm font-light"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#5dd7e6] to-[#018b99] text-[#002e33] font-bold rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(93,215,230,0.3)] text-sm"
                >
                  Join Now
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 