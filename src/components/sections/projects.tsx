import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '../ui/button';
import { lazy, Suspense } from 'react';
import { projects } from '../../data/project';
import { Project } from '../../types/project';
import {
  ChevronRight,
  ChevronUp,
  Filter,
  Globe,
  Brain,
  BarChart3,
  Database,
  Code,
  Users
} from 'lucide-react';

// Lazy load non-critical components
const ProjectCard = lazy(() => import('../shared/project-card'));

// Utility function to normalize category names
const normalizeCategory = (category: string): string => {
  return category.toLowerCase().trim().replace(/\s+/g, ' ');
};

// Utility function to format category for display
const formatCategoryDisplay = (category: string): string => {
  const normalized = normalizeCategory(category);
  if (normalized === 'ml&genai') return 'ML&GenAI';
  
  return category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Category-specific colors removed (unused)

const CategoryIcon = ({ category }: { category: string }) => {
  const iconMap: Record<string, React.ReactElement> = {
    // General categories
    all: <Filter className="h-4 w-4" />,
    web: <Globe className="h-4 w-4" />,
    'ml&genai': <Brain className="h-4 w-4" />,
    database: <Database className="h-4 w-4" />,
    'data analysis': <BarChart3 className="h-4 w-4" />,
    python: <Code className="h-4 w-4" />,
    group: <Users className="h-4 w-4" />,
  };

  // Normalize category to match keys in iconMap
  const normalizedCategory = normalizeCategory(category);

  return iconMap[normalizedCategory] || <Filter className="h-4 w-4" />;
};

// Pre-defined animation variants - moved outside component
const headingVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 12,
      duration: 0.8
    }
  }
};

const filterVariants = {
  inactive: { scale: 1, y: 0 },
  active: {
    scale: 1.08,
    y: -2,
    transition: { type: "spring" as const, stiffness: 300, damping: 10 }
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
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    scale: 1.05,
    y: -3,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
  },
  tap: {
    scale: 0.97,
    y: -1,
  }
};

// Simple loading fallback component
const CardSkeleton = () => (
  <div className="h-[300px] rounded-lg glass-card animate-pulse"></div>
);

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Normalize project categories and create unique set
  const normalizedProjects = useMemo(() =>
    projects.map(project => ({
      ...project,
      category: normalizeCategory(project.category)
    })),
    []
  );

  // Memoize categories to prevent recalculation with specific custom ordering
  const categories = useMemo(() => {
    const order = ['all', 'data analysis', 'ml&genai', 'web', 'database', 'group', 'python'];
    const uniqueCategories = Array.from(
      new Set(normalizedProjects.map(project => project.category))
    );

    // Return the list based on the predefined order
    return order.filter(cat => cat === 'all' || uniqueCategories.includes(cat));
  }, [normalizedProjects]);

  // Optimize mouse tracking with throttling/debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  // Replace interval with requestAnimationFrame for better performance
  useEffect(() => {
    if (!isInView) return;

    return () => {};
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Memoize parallax calculation with proper SSR handling
  const getParallaxStyle = useCallback((depth = 0.05) => {
    if (typeof window === 'undefined') return {};

    const x = (window.innerWidth / 2 - mousePosition.x) * depth;
    const y = (window.innerHeight / 2 - mousePosition.y) * depth;
    return {
      transform: `translate(${x}px, ${y}px)`
    };
  }, [mousePosition.x, mousePosition.y]);

  // Memoize filtered projects to prevent recalculation on each render
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return normalizedProjects;
    }

    const normalizedFilter = normalizeCategory(activeFilter);
    return normalizedProjects.filter(project =>
      project.category === normalizedFilter
    );
  }, [activeFilter, normalizedProjects]);

  // Memoize visible projects
  const visibleProjects = useMemo(() =>
    showAll ? filteredProjects : filteredProjects.slice(0, 4),
    [showAll, filteredProjects]
  );

  const handleFilterChange = useCallback((category: string) => {
    setActiveFilter(category);
    setShowAll(false);
  }, []);

  const handleShowAll = useCallback(() => {
    setShowAll(true);
  }, []);

  const handleShowLess = useCallback(() => {
    setShowAll(false);
  }, []);

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={headingVariants}
      className="py-28 relative overflow-hidden"
    >
      {/* Animated background with SSR check */}
      {typeof window !== 'undefined' && (
        <motion.div
          className="absolute -top-10 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-blue-400/20 to-sky-300/15 rounded-full filter blur-[100px] opacity-80 z-0"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'mirror' as const
          }}
          style={getParallaxStyle(0.02)}
        />
      )}

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
              type: 'spring' as const,
              stiffness: 100
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear' as const
              }}
            />
            <div className="glass-card !rounded-full px-4 py-2 flex items-center gap-2 relative z-10 border border-white/10 inner-glow">
              <span className="text-sm font-medium text-white/90">My Work</span>
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
          className="flex justify-center mb-10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="p-2 glass-card rounded-2xl md:rounded-full inline-flex flex-wrap justify-center shadow-2xl max-w-full gap-2 border border-white/10 inner-glow">
            {categories.map((category) => {
              const normalizedCategory = normalizeCategory(category);
              const displayCategory = formatCategoryDisplay(category);

              return (
                <motion.button
                  key={normalizedCategory}
                  onClick={() => handleFilterChange(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeFilter === category
                      ? `bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20`
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  variants={filterVariants}
                  animate={activeFilter === category ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CategoryIcon category={category} />
                  <span className="whitespace-nowrap">{displayCategory}</span>
                </motion.button>
              );
            })}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {visibleProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Math.min(index * 0.1, 0.3),
                duration: 0.5
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full group">
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
          {!showAll && filteredProjects.length > 4 ? (
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
                onClick={handleShowAll}
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
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear' as const
                  }}
                  style={{ backgroundSize: '200% 100%' }}
                />
              </Button>
            </motion.div>
          ) : (
            showAll && filteredProjects.length > 4 && (
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
                  onClick={handleShowLess}
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
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear' as const
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