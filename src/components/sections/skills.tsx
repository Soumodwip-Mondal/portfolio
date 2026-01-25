'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Code, Database, Globe, Palette, Server, Smartphone, Sparkles, Zap, Star, TrendingUp, Shield, Award } from 'lucide-react';

// Memoized Icons with enhanced animations
const SkillIcon = memo(({ icon, color }: { icon: React.ReactNode; color: string }) => (
  <motion.div
    className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {icon}
  </motion.div>
));

// Skill Data Types
interface Skill {
  name: string;
  level: number; // 1-5
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  const skillsData: SkillCategory[] = [
    {
      title: 'Data Analysis',
      icon: <Palette size={22} />,
      color: 'from-blue-500 to-indigo-600',
      skills: [
        { name: 'Python', level: 5, icon: <Code size={18} />, color: 'from-green-400 to-green-600' },
        { name: 'SQL', level: 4, icon: <Code size={18} />, color: 'from-pink-400 to-pink-600' },
        { name: 'Tableau', level: 4, icon: <Code size={18} />, color: 'from-blue-500 to-indigo-500' },
        { name: 'Web Scraping', level: 5, icon: <Palette size={18} />, color: 'from-purple-400 to-purple-600' },
        // { name: '', level: 3, icon: <Palette size={18} />, color: 'from-purple-400 to-purple-600' },
      ],
    },
    {
      title: 'Backend',
      icon: <Server size={22} />,
      color: 'from-emerald-500 to-green-600',
      skills: [
        { name: 'Node.js', level: 4, icon: <Server size={18} />, color: 'from-green-400 to-green-600' },
        { name: 'Express', level: 4, icon: <Server size={18} />, color: 'from-emerald-400 to #94A3B8' },
        { name: 'MongoDB', level: 3, icon: <Database size={18} />, color: 'from-green-500 to-teal-500' },
        { name: 'PostgreSQL', level: 3, icon: <Database size={18} />, color: 'from-blue-400 to-blue-600' },
        { name: 'MySQL', level: 2, icon: <Database size={18} />, color: 'from-pink-400 to-pink-600' },
      ],
    },
    {
      title: 'Other',
      icon: <Globe size={22} />,
      color: 'from-amber-500 to-orange-600',
      skills: [
        { name: 'Git', level: 4, icon: <Code size={18} />, color: 'from-orange-400 to-orange-600' },
        { name: 'UI/UX Design', level: 3, icon: <Palette size={18} />, color: 'from-pink-400 to-pink-600' },
        { name: 'Responsive Design', level: 5, icon: <Smartphone size={18} />, color: 'from-indigo-400 to-indigo-600' },
        { name: 'SEO', level: 3, icon: <Globe size={18} />, color: 'from-blue-400 to-blue-600' },
        { name: 'Performance Optimization', level: 4, icon: <Shield size={18} />, color: 'from-amber-400 to-amber-600' },
      ],
    },
  ];

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const section = document.getElementById('skills');
    if (section) {
      const { top } = section.getBoundingClientRect();
      if (top < window.innerHeight * 0.75) {
        controls.start('visible');
        setIsVisible(true);
      }
    }
  }, [controls]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Enhanced Animation Variants
  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10
      }
    },
  };

  const tabVariants = {
    inactive: { opacity: 0.7, scale: 0.95, y: 0 },
    active: {
      opacity: 1,
      scale: 1.05,
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 300
      }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
        delay: i * 0.1
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const barVariants = {
    initial: { width: 0 },
    animate: (level: number) => ({
      width: `${level * 20}%`,
      transition: {
        duration: 1.5,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.2
      }
    }),
  };

  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0.8],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        repeatDelay: 2
      }
    },
  };

  // Enhanced Rating Bar with animation
  const RatingBar = memo(({ skill }: { skill: Skill; index: number }) => {
    const isHovered = hoveredSkill === skill.name;
    return (
      <div className="relative mt-4">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative transition-all duration-500`}
            style={{ width: `${skill.level * 20}%` }}
          >
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute -top-6 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Award size={12} />
              {skill.level * 20}%
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  });

  // Static Stars without any animation
  const Stars = memo(({ level }: { level: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <Star
            size={16}
            fill={i < level ? '#FFD700' : 'none'}
            color={i < level ? '#FFD700' : '#94A3B8'}
          />
        </div>
      ))}
    </div>
  ));

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Enhanced Background Effects */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20 blur-3xl" />

          {/* Fixed Particles - Now uses static positioning instead of dynamic calculations */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 pointer-events-none"
              initial={{
                x: (i % 5) * 200,
                y: Math.floor(i / 5) * 200,
                scale: 0
              }}
              animate={{
                y: [0, -100, 0],
                x: [(i % 5) * 200, (i % 5) * 200 + ((i % 2) ? 50 : -50), (i % 5) * 200],
                scale: [0, 0.5 + (i % 3) * 0.1, 0],
                opacity: [0, 0.6, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + (i % 4) * 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              style={{
                width: 8 + (i % 4) * 4,
                height: 8 + (i % 4) * 4,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </motion.div>

        {/* Enhanced Title with animations */}
        <motion.div
          className="text-center mb-16 relative z-10"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <motion.div className="inline-block relative">
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 leading-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              My Expertise
              <motion.span
                className="inline-block ml-3"
                variants={sparkleVariants}
                initial="hidden"
                animate="visible"
              >
                <Sparkles size={28} className="text-yellow-400" />
              </motion.span>
            </motion.h2>
            <motion.div
              className="h-1.5 w-32 mx-auto mt-5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              initial={{ scaleX: 0, opacity: 0.5 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            />
          </motion.div>

          <motion.p
            className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-6 text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A showcase of my technical prowess and creative skills
          </motion.p>
        </motion.div>

        {/* Enhanced animated tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {skillsData.map((category, idx) => (
            <motion.button
              key={idx}
              className={`px-6 py-3 rounded-full flex items-center gap-2 bg-gradient-to-r ${category.color} text-white shadow-lg`}
              onClick={() => setSelectedCategory(idx)}
              variants={tabVariants}
              initial="inactive"
              animate={selectedCategory === idx ? 'active' : 'inactive'}
              whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.div
                animate={selectedCategory === idx ?
                  { rotate: [0, 15, 0], scale: [1, 1.2, 1] } :
                  { rotate: 0, scale: 1 }
                }
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.div>
              <span className="font-semibold">{category.title}</span>
              {selectedCategory === idx && (
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Zap size={16} className="text-yellow-300" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Fixed to prevent blinking */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {skillsData[selectedCategory].skills.map((skill, idx) => (
            <motion.div
              key={`${selectedCategory}-${skill.name}`}
              className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 shadow-xl border border-slate-100/50 dark:border-slate-700/50 backdrop-blur-lg relative overflow-hidden group"
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Enhanced background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-10`}
                animate={hoveredSkill === skill.name ?
                  { opacity: 0.25, scale: 1.2, rotate: 5 } :
                  { opacity: 0.1, scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.5 }}
              />

              {/* Enhanced card content with animations */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <SkillIcon icon={skill.icon} color={skill.color} />
                  <div>
                    <motion.h3
                      className="text-xl font-bold text-slate-800 dark:text-slate-100"
                      animate={hoveredSkill === skill.name ?
                        { scale: 1.05, x: 3 } :
                        { scale: 1, x: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {skill.name}
                    </motion.h3>
                    <Stars level={skill.level} />
                  </div>
                </div>
                {skill.level >= 4 && (
                  <motion.div
                    className="text-green-500 dark:text-green-400"
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.2, 1.2, 1],
                      transition: { duration: 0.8 }
                    }}
                  >
                    <TrendingUp size={22} />
                  </motion.div>
                )}
              </div>

              {/* Enhanced rating bar */}
              <RatingBar skill={skill} index={idx} />

              {/* Simplified sparkle effect on hover - fixed positioning issues */}
              <AnimatePresence>
                {hoveredSkill === skill.name && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-white pointer-events-none"
                        initial={{
                          opacity: 0,
                          scale: 0,
                          top: '50%',
                          left: '50%',
                          x: '-50%',
                          y: '-50%'
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          top: ['50%', `${35 + (i * 15)}%`],
                          left: ['50%', `${35 + ((i + 2) % 4 * 15)}%`]
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* New feature: Section summary with animation */}
        <motion.div
          className="mt-16 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="h-0.5 w-16 bg-indigo-500/50 mx-auto mb-6"
            whileInView={{ width: [0, 64] }}
            transition={{ duration: 1 }}
          />
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-sm">
            Skills are continuously updated as I expand my expertise in web development and design.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;