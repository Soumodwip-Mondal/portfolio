'use client';

import { motion } from 'framer-motion';

export default function Blog() {
  // Sample blog posts - replace with your actual data
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and how to create your first component.',
      date: 'June 15, 2023',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      title: 'Understanding TypeScript',
      excerpt: 'A beginner-friendly guide to TypeScript and its benefits.',
      date: 'July 22, 2023',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      title: 'Tailwind CSS Tips and Tricks',
      excerpt: 'Improve your workflow with these Tailwind CSS techniques.',
      date: 'August 10, 2023',
      imageUrl: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <section id="blog" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Blog</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-[#1c1b1b] border border-[#3f484a]/30 rounded-xl overflow-hidden hover:border-[#5dd7e6]/25 hover:shadow-[0_0_20px_rgba(93,215,230,0.06)] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-xs text-[#899295]">{post.date}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 text-[#e5e2e1]">{post.title}</h3>
                <p className="text-[#bec8ca] mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                <a 
                  href={`/blog/${post.id}`} 
                  className="text-[#5dd7e6] hover:text-[#8df2ff] font-medium inline-flex items-center text-sm transition-colors"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 