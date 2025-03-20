'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '../ui/button';
import ProjectCard from '../shared/project-card';
import { projects } from '../../data/project';
import { Project } from '../../types/project';
import { ChevronRight, Star, Sparkles, Filter, Globe, Smartphone, Palette, Cpu, Database } from 'lucide-react';

// Category-specific colors
const categoryColors: Record<string, string> = {
  all: 'from-blue-600 to-purple-600',
  web: 'from-blue-600 to-cyan-500',
  mobile: 'from-emerald-600 to-teal-500',
  design: 'from-pink-500 to-rose-500',
  ai: 'from-violet-600 to-purple-600',
  data: 'from-amber-500 to-orange-500'
};

// Category-specific icons
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'all':
      return <Filter className="h-4 w-4" />;
    case 'web':
      return <Globe className="h-4 w-4" />;
    case 'mobile':
      return <Smartphone className="h-4 w-4" />;
    case 'design':
      return <Palette className="h-4 w-4" />;
    case 'ai':
      return <Cpu className="h-4 w-4" />;
    case 'data':
      return <Database className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
  }
};

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
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
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

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

  // Filter projects based on active filter
  const filteredProjects: Project[] = activeFilter === 'all' 
    ? projects 
    : projects.filter((project: Project) => project.category === activeFilter);

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Get the appropriate gradient color for the active category
  const getActiveCategoryGradient = (category: string) => {
    return categoryColors[category] || categoryColors['all'];
  };

  return (
    <motion.section 
      id="projects"
      ref={sectionRef}
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
        className="absolute bottom-20 right-1/4 w-[20rem] h-[20rem] bg-gradient-to-tr from-purple-400/15 to-pink-300/10 rounded-full filter blur-[80px] opacity-70 z-0" 
        animate={{ 
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 0.95, 1.02, 1]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
        style={getParallaxStyle(0.03)}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading with enhanced animation */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center justify-center mb-3 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" 
              animate={{ 
                rotate: [0, 360], 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 flex items-center gap-2 relative z-10">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">My Work</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
            variants={headingVariants}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore my latest work showcasing creative solutions and technical expertise. My Portfolio is my best project. Currently I am working on it. Many project is going to be added soon.
          </motion.p>
        </div>
        
        {/* Enhanced filter buttons with animations */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="p-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full flex flex-wrap justify-center shadow-lg">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === category 
                    ? `bg-gradient-to-r ${getActiveCategoryGradient(category)} text-white shadow-md` 
                    : 'hover:bg-muted'
                }`}
                variants={filterVariants}
                animate={activeFilter === category ? 'active' : 'inactive'}
                whileHover={{ scale: activeFilter === category ? 1.08 : 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <CategoryIcon category={category} />
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Project count indicator */}
        <motion.div 
          className="text-center text-sm text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Showing {filteredProjects.length} of {projects.length} projects
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Projects grid with enhanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"> 
          {filteredProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full group">
                {/* Sparkle effect for featured projects */}
                {project.featured && showSparkle && hoveredIndex === index && (
                  <motion.div
                    className="absolute -top-4 -right-4 z-20 text-yellow-400"
                    variants={sparkleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Star className="h-6 w-6 filter drop-shadow-lg" />
                  </motion.div>
                )}
                
                {/* Project card with focus/fade effect */}
                <ProjectCard 
                  project={project}
                  isFocused={hoveredIndex === index}
                  anyCardFocused={hoveredIndex !== null} 
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced CTA button */}
        <motion.div 
          className="text-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg group relative overflow-hidden"
            onClick={() => window.open('/projects', '_blank')}
          >
            <span className="relative z-10 flex items-center">
              Explore All Projects <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            
            {/* Button background animation */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 100%' }}
            />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}