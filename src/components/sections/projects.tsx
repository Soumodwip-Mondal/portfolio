'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '../ui/button';
import { lazy, Suspense } from 'react';
import { projects } from '../../data/project';
import { Project } from '../../types/project';
import { 
  ChevronRight, 
  ChevronUp, 
  Star, 
  Sparkles, 
  Filter, 
  Globe, 
  Brain, 
  BarChart3,
  Cpu, 
  Database, 
  Code, 
  Users,
  MessageSquare
} from 'lucide-react';

// Lazy load non-critical components
const ProjectCard = lazy(() => import('../shared/project-card'));

// Category-specific colors - moved outside component to avoid re-creation
const categoryColors: Record<string, string> = {
  all: 'from-blue-600 to-purple-600',
  web: 'from-green-600 to-cyan-500',
  ai: 'from-violet-600 to-purple-600',
  database: 'from-amber-500 to-orange-500',
  ml:'from-pink-500 to-rose-500',
  analytics:'from-emerald-600 to-teal-500',
  python: 'from-yellow-500 to-amber-500',
  group: 'from-amber-500 to-orange-500',
};

// Category-specific icons - Improved component with better icon mapping
const CategoryIcon = ({ category }: { category: string }) => {
  const iconMap = {
    // General categories
    all: <Filter className="h-4 w-4" />,
    web: <Globe className="h-4 w-4" />,
    ml: <Brain className="h-4 w-4" />,
    ai: <Cpu className="h-4 w-4" />,
    database: <Database className="h-4 w-4" />,
    'data analysis': <BarChart3 className="h-4 w-4" />,
    python: <Code className="h-4 w-4" />,
    group: <Users className="h-4 w-4" />,
    'customer segmentation': <Users className="h-4 w-4" />,
    'sentiment analysis': <MessageSquare className="h-4 w-4" />,
  };
  
  // Normalize category name for consistent matching
  const normalizedCategory = category.toLowerCase().trim();
  
  return iconMap[normalizedCategory as keyof typeof iconMap] || <Sparkles className="h-4 w-4" />;
};

// Pre-defined animation variants - moved outside component
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
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { 
    scale: 0.97,
    y: -1,
  }
};

// Simple loading fallback component
const CardSkeleton = () => (
  <div className="h-[320px] rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
);

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false); // Start false to reduce initial load animations
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Memoize categories to prevent recalculation
  const categories = useMemo(() => 
    ['all', ...Array.from(new Set(projects.map(project => project.category)))], 
    []
  );
  
  // Optimize mouse tracking with throttling/debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }, 50); // 50ms throttle
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Replace interval with requestAnimationFrame for better performance
  useEffect(() => {
    if (!isInView) return; // Don't run effect if not in view
    
    let sparkleTimeout: NodeJS.Timeout;
    let animationFrameId: number;
    let lastTime = 0;
    const minInterval = 2000;
    
    const animateSparkle = (timestamp: number) => {
      if (timestamp - lastTime > minInterval) {
        setShowSparkle(true);
        lastTime = timestamp;
        
        sparkleTimeout = setTimeout(() => {
          setShowSparkle(false);
        }, 1200);
      }
      
      animationFrameId = requestAnimationFrame(animateSparkle);
    };
    
    animationFrameId = requestAnimationFrame(animateSparkle);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(sparkleTimeout);
    };
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Memoize parallax calculation
  const getParallaxStyle = useMemo(() => {
    return (depth = 0.05) => {
      if (typeof window === 'undefined') return {}; // SSR check
      
      const x = (window.innerWidth / 2 - mousePosition.x) * depth;
      const y = (window.innerHeight / 2 - mousePosition.y) * depth;
      return {
        transform: `translate(${x}px, ${y}px)`
      };
    };
  }, [mousePosition.x, mousePosition.y]);

  // Memoize filtered projects to prevent recalculation on each render
  const filteredProjects = useMemo(() => 
    activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category.toLowerCase() === activeFilter.toLowerCase()),
    [activeFilter]
  );

  // Memoize visible projects
  const visibleProjects = useMemo(() => 
    showAll ? filteredProjects : filteredProjects.slice(0, 3),
    [showAll, filteredProjects]
  );

  return (
    <motion.section 
      id="projects"
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={headingVariants}
      className="py-28 relative overflow-hidden"
    >
      {/* Reduce number of animated background elements */}
      <motion.div 
        className="absolute -top-10 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-blue-400/20 to-sky-300/15 rounded-full filter blur-[100px] opacity-80 z-0" 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 20, // Slower animation for better performance
          repeat: Infinity,
          repeatType: "mirror"
        }}
        style={getParallaxStyle(0.02)}
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
              }}
              transition={{ 
                duration: 12, // Slower for better performance
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
        
        {/* Filter buttons with improved performance */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="p-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full inline-flex flex-wrap justify-center shadow-lg max-w-full gap-1">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setShowAll(false);
                }}
                className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === category 
                    ? `bg-gradient-to-r ${categoryColors[category.toLowerCase()] || categoryColors.all} text-white shadow-md` 
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
              key={`${activeFilter}-${showAll}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Showing {visibleProjects.length} of {filteredProjects.length} projects
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Projects grid with lazy loading and reduced animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"> 
          {visibleProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: Math.min(index * 0.1, 0.3), // Limit max delay to 0.3s
                duration: 0.5
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full group">
                {/* Only show sparkle for featured projects when needed */}
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
                
                {/* Lazy loaded project card */}
                <Suspense fallback={<CardSkeleton />}>
                  <ProjectCard 
                    project={project}
                    isFocused={hoveredIndex === index}
                    anyCardFocused={hoveredIndex !== null} 
                  />
                </Suspense>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA buttons - Show either "Explore All" or "Show Less" button */}
        <AnimatePresence mode="wait">
          {!showAll && filteredProjects.length > 3 ? (
            <motion.div 
              key="explore-button"
              className="text-center"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground group relative overflow-hidden"
                onClick={() => setShowAll(true)}
              >
                <span className="relative z-10 flex items-center">
                  Explore All Projects <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 8, // Increased duration for better performance
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 100%' }}
                />
              </Button>
            </motion.div>
          ) : (
            showAll && filteredProjects.length > 3 && (
              <motion.div 
                key="show-less-button"
                className="text-center"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-primary hover:from-purple-600/90 hover:to-primary/90 text-primary-foreground group relative overflow-hidden"
                  onClick={() => setShowAll(false)}
                >
                  <span className="relative z-10 flex items-center">
                    Show Less <ChevronUp className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                  </span>
                  
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                      duration: 8, // Increased duration for better performance
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                </Button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}