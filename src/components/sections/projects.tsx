'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import ProjectCard from '../shared/project-card';
import { projects } from '../../data/project';
import AnimatedContainer from '../shared/animated-container';
import { ChevronRight, Star, Sparkles, Zap } from 'lucide-react';

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  
  // Track mouse position for enhanced effects
  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Control sparkle effect timing with improved randomness
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
    }, Math.random() * 2000 + 2000); // Random interval between 2-4 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Enhanced entrance animation sequence
  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible');
    };
    sequence();
  }, [controls]);

  const headingVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };


  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -15 },
    visible: { 
      scale: [0, 1.4, 0.9, 1.2, 0], 
      opacity: [0, 0.8, 1, 0.6, 0], 
      rotate: [-15, 5, -5, 10, 0],
      transition: { duration: 1.8, ease: "easeInOut" } 
    }
  };

  const filterVariants = {
    inactive: { scale: 1, y: 0 },
    active: { 
      scale: 1.08, 
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  // Improved grid layout animation with 3D effects
  const calculateGridAnimation = (index: number) => {
    const baseDelay = 0.1;
    const rowSize = 3; // Assuming 3 columns in desktop view
    const row = Math.floor(index / rowSize);
    const col = index % rowSize;
    
    // Wave-like staggered delay based on position in grid
    const delay = baseDelay + (row * 0.1 + col * 0.05);
    
    return {
      hidden: { 
        opacity: 0, 
        y: 40, 
        scale: 0.9,
        rotateX: 5,
        rotateY: index % 2 === 0 ? -5 : 5
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        transition: { 
          delay: delay,
          duration: 0.7, 
          type: "spring",
          stiffness: 80,
          damping: 10
        }
      }
    };
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        delay: 1.0,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      scale: 1.05,
      y: -3,
      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.25), 0 10px 10px -5px rgba(59, 130, 246, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.97,
      y: -1,
      boxShadow: "0 5px 15px -3px rgba(59, 130, 246, 0.15), 0 4px 6px -2px rgba(59, 130, 246, 0.05)",
    }
  };

  // Enhanced dynamic parallax effect
  const getParallaxStyle = (depth = 0.05) => {
    const x = (window.innerWidth / 2 - mousePosition.x) * depth;
    const y = (window.innerHeight / 2 - mousePosition.y) * depth;
    return {
      transform: `translate(${x}px, ${y}px)`
    };
  };

  // Improved gradient animation
  const gradientAnimation = {
    backgroundSize: "200% 200%",
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: { 
      repeat: Infinity, 
      repeatType: "mirror" as const, 
      duration: 6, 
      ease: "easeInOut" 
    }
  };

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <motion.section 
      id="projects"
      initial="hidden"
      animate={controls}
      variants={headingVariants}
      className="py-28 relative overflow-hidden"
    >
      {/* Enhanced animated background elements with parallax */}
      <motion.div 
        className="absolute -top-10 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-blue-400/20 to-sky-300/15 rounded-full filter blur-[100px] opacity-80 z-0" 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.05, 0.98, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
        style={getParallaxStyle(0.02)}
      />
      
      <motion.div 
        className="absolute bottom-10 right-1/3 w-[26rem] h-[26rem] bg-gradient-to-tr from-indigo-400/15 to-purple-300/10 rounded-full filter blur-[90px] opacity-70 z-0" 
        animate={{ 
          x: [0, -35, 0],
          y: [0, 25, 0],
          scale: [1, 0.95, 1.02, 1]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1
        }}
        style={getParallaxStyle(0.025)}
      />
      
      <motion.div 
        className="absolute top-1/3 right-10 w-[20rem] h-[20rem] bg-gradient-to-bl from-emerald-400/15 to-teal-300/10 rounded-full filter blur-[80px] opacity-70 z-0" 
        animate={{ 
          x: [0, 20, 0],
          y: [0, 40, 0],
          scale: [1, 1.03, 0.97, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2
        }}
        style={getParallaxStyle(0.03)}
      />
      
      {/* Light mode enhancement: Subtle light rays */}
      <motion.div 
        className="absolute top-0 left-1/2 w-[30rem] h-[35rem] bg-gradient-to-b from-amber-200/20 via-amber-100/5 to-transparent rounded-[100%] filter blur-[60px] opacity-80 -translate-x-1/2 z-0 hidden lg:block" 
        animate={{ 
          scaleY: [1, 1.1, 0.98, 1],
          opacity: [0.7, 0.8, 0.6, 0.7]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced heading with improved animation */}
        <motion.div 
          className="text-center mb-20 relative"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          {/* Enhanced sparkle effect */}
          <AnimatePresence>
            {showSparkle && (
              <motion.div 
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                variants={sparkleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Sparkles className="w-24 h-24 text-amber-400 opacity-80" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            className="inline-block relative"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div className="relative inline-block">
              <motion.h2 
                className="text-4xl lg:text-6xl font-bold mb-6 inline-block" 
                variants={{
                  animate: {
                    backgroundImage: [
                      "linear-gradient(45deg, #3b82f6, #6366f1, #8b5cf6)",
                      "linear-gradient(45deg, #6366f1, #8b5cf6, #3b82f6)",
                      "linear-gradient(45deg, #8b5cf6, #3b82f6, #6366f1)"
                    ],
                    ...gradientAnimation
                  }
                }}
                animate="animate"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "200% 200%"
                }}
              >
                Featured Projects
              </motion.h2>
              
              {/* Enhanced decorative elements */}
              <motion.div 
                className="absolute -top-8 -right-10 text-amber-400"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 0.9, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <Star className="w-8 h-8 fill-amber-400" />
              </motion.div>
              
              {/* New decorative element */}
              <motion.div 
                className="absolute -bottom-1 -left-8 text-blue-500"
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 0.8, 1.1, 1],
                  y: [0, 3, -3, 0]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, repeatType: "reverse" },
                  y: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <Zap className="w-6 h-6 fill-blue-500" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-slate-700 dark:text-slate-300 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            A showcase of my creative projects and technical explorations
          </motion.p>
          
          {/* Enhanced filter tabs with improved UI */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {['all', 'web', 'mobile', 'design'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 font-medium rounded-full relative ${
                  activeFilter === filter 
                    ? 'text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                variants={filterVariants}
                animate={activeFilter === filter ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                {activeFilter === filter && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full -z-10"
                    layoutId="activeFilterBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Filter stats */}
          <motion.div
            className="mt-3 text-sm text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Showing {filteredProjects.length} of {projects.length} projects
          </motion.div>
        </motion.div>
        
        {/* Enhanced projects grid with improved animations and effects */}
        <AnimatedContainer 
          variants={containerVariants} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={calculateGridAnimation(index)}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="h-full perspective-1000"
            >
              <motion.div 
                className={`
                  rounded-2xl overflow-hidden
                  shadow-lg shadow-slate-200/80 dark:shadow-slate-900/30
                  hover:shadow-xl hover:shadow-blue-100/70 dark:hover:shadow-blue-900/20
                  bg-white dark:bg-slate-800/90 backdrop-blur-sm
                  border border-slate-100/80 dark:border-slate-700/50
                  h-full relative
                  transform-gpu transition-all duration-300
                `}
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={
                  hoveredIndex === index 
                    ? { rotateX: 0, rotateY: 0, z: 30 } 
                    : { rotateX: 0, rotateY: 0, z: 0 }
                }
              >
                {/* Improved card with enhanced 3D effects */}
                <motion.div
                  className="h-full"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={
                    hoveredIndex === index 
                      ? { 
                          rotateX: (mousePosition.y - window.innerHeight / 2) * 0.008,
                          rotateY: -(mousePosition.x - window.innerWidth / 2) * 0.008
                        } 
                      : { rotateX: 0, rotateY: 0 }
                  }
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                >
                  <ProjectCard project={project} />
                  
                  {/* Enhanced glowing effect on hover - improved for light mode */}
                  {hoveredIndex === index && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-white/5 opacity-70 dark:opacity-0 rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-indigo-400/5 dark:from-blue-400/20 dark:to-indigo-500/10 rounded-2xl" />
                    </motion.div>
                  )}
                  
                  {/* Enhanced overlay with animated buttons */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 rounded-2xl z-10 flex flex-col justify-end items-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-full space-y-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredIndex === index ? 0 : 20, 
                        opacity: hoveredIndex === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Button
                        variant="default"
                        size="default"
                        className="w-full bg-white hover:bg-white/90 text-slate-900 font-medium shadow-lg"
                      >
                        View Project
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="default"
                        className="w-full border-white/40 text-white hover:bg-white/10 font-medium backdrop-blur-sm"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatedContainer>
        
        {/* Improved CTA button with enhanced animations */}
        <motion.div 
          className="flex justify-center mt-20"
          variants={buttonVariants}
          initial="hidden" 
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            variant="default" 
            className="px-10 py-6 text-lg font-medium rounded-xl relative overflow-hidden group"
          >
            {/* Enhanced animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "loop", 
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />
            
            {/* Improved animated shine effect */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{ 
                backgroundPosition: ['200% 50%', '-50% 50%'],
              }}
              transition={{ 
                duration: 1.2,
                repeat: 0,
                ease: "easeOut"
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                backgroundSize: '200% 100%',
              }}
            />
            
            {/* Button content with enhanced animation */}
            <motion.span 
              className="relative flex items-center"
              whileHover={{
                x: [0, 3, 0],
                transition: { duration: 0.5, repeat: Infinity }
              }}
            >
              Explore All Projects <ChevronRight className="ml-2 h-5 w-5" />
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}