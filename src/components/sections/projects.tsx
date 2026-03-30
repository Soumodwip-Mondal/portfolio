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
      categories: project.categories.map(cat => normalizeCategory(cat))
    })),
    []
  );

  // Memoize categories to prevent recalculation with specific custom ordering
  const categories = useMemo(() => {
    const order = ['all', 'data analysis', 'ml&genai', 'web', 'database', 'group', 'python'];
    const uniqueCategories = Array.from(
      new Set(normalizedProjects.flatMap(project => project.categories))
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

    return () => { };
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
      project.categories.includes(normalizedFilter)
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
      className="pt-16 pb-28 !mb-0 relative overflow-hidden"
    >
      {/* Animated background with SSR check - Premium Atmosphere */}
      {typeof window !== 'undefined' && (
        <motion.div
          className="absolute -top-10 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-[#5dd7e6]/10 to-transparent rounded-full filter blur-[120px] opacity-60 z-0"
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
            className="inline-flex items-center justify-center mb-6 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card !rounded-full px-5 py-2 flex items-center gap-2.5 relative z-10 border border-white/10 inner-glow bg-white/[0.02]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5dd7e6]">My Work</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-[#5dd7e6] to-white/40 bg-clip-text text-transparent animate-gradient-x"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Digital Atelier
          </motion.h1>
          <motion.p
            className="text-lg text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A curated portfolio of strategic data solutions and high-performance digital experiments. Currently evolving this space with new breakthroughs.
          </motion.p>
        </div>

        {/* Filter buttons with improved performance */}
        <motion.div
          className="flex justify-center mb-10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="p-2 glass-card rounded-2xl md:rounded-full inline-flex flex-wrap justify-center shadow-2xl max-w-full gap-2 border border-white/5 bg-white/[0.01] backdrop-blur-3xl">
            {categories.map((category) => {
              const normalizedCategory = normalizeCategory(category);
              const displayCategory = formatCategoryDisplay(category);
              return (
                <motion.button
                  key={normalizedCategory}
                  onClick={() => handleFilterChange(category)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${activeFilter === category ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {activeFilter === category && (
                    <motion.div
                      layoutId="projects-filter-pill"
                      className="absolute inset-0 rounded-full bg-white/20 border border-white/20 shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10"><CategoryIcon category={category} /></span>
                  <span className="relative z-10 whitespace-nowrap">{displayCategory}</span>
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

        {/* Projects grid — per-card stagger entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {visibleProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              className="h-full"
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full group">
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
                className="bg-gradient-to-r from-[#5dd7e6] to-[#018b99] hover:from-[#5dd7e6]/90 hover:to-[#018b99]/90 text-[#00363c] border-0 shadow-[0_8px_20px_rgba(93,215,230,0.3)] hover:shadow-[0_12px_24px_rgba(93,215,230,0.4)] transition-all duration-300 group relative overflow-hidden px-8"
                onClick={handleShowAll}
              >
                <span className="relative z-10 flex items-center font-bold">
                  Explore All Projects <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#018b99] to-[#5dd7e6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                  className="bg-gradient-to-r from-[#018b99] to-[#5dd7e6] hover:from-[#018b99]/90 hover:to-[#5dd7e6]/90 text-[#00363c] border-0 shadow-[0_8px_20px_rgba(93,215,230,0.3)] hover:shadow-[0_12px_24px_rgba(93,215,230,0.4)] transition-all duration-300 group relative overflow-hidden px-8"
                  onClick={handleShowLess}
                >
                  <span className="relative z-10 flex items-center font-bold">
                    Show Less <ChevronUp className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                  </span>

                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#5dd7e6] to-[#018b99] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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