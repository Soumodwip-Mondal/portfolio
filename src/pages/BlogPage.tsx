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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch blogs from JSON
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
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
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <motion.div
            className="absolute top-1/3 left-1/5 w-4 h-4 bg-yellow-400 rounded-full"
            animate={{
              y: [0, 15, -15, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/5 w-3 h-3 bg-green-400 rounded-full"
            animate={{
              y: [0, -20, 20, 0],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
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
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "40%" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 mb-4 mx-auto"
                />
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold text-center mb-6"
                >
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      My Blog
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200 dark:bg-blue-900/50 -z-10"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-xl text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-8"
                >
                  Thoughts, stories and ideas about web development, design, and technology.
                </motion.p>

                {/* Search and filter section */}
                <motion.div
                  variants={itemVariants}
                  className="max-w-3xl mx-auto mb-12 bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <select
                        value={selectedCategory || 'All'}
                        onChange={(e) => setSelectedCategory(e.target.value === 'All' ? null : e.target.value)}
                        className="w-full md:w-auto px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
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
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700 h-full flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-56 object-cover transition-transform"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                      {post.categories.map(category => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-blue-500/80 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 flex-grow">{post.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{post.excerpt}</p>
                    <a
                      href={post.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center group mt-auto"
                    >
                      Read on Medium
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
            className="mt-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Subscribe to my newsletter</h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-6 max-w-2xl mx-auto">
                Get the latest posts delivered right to your inbox. No spam, ever.
              </p>

              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
                >
                  Subscribe
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