'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import image from '../../assets/MyImage.jpg';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  // const { scrollY } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Skills with color variants
  const skills: { name: string; color: keyof typeof colorMap }[] = [
    { name: 'JavaScript', color: 'blue' },
    { name: 'React', color: 'cyan' },
    { name: 'Data Analysis', color: 'indigo' },
    { name: 'Tailwind CSS', color: 'sky' },
    { name: 'Python', color: 'violet' },
    { name: 'Tableau', color: 'green' },
    { name: 'SQL', color: 'pink' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 60,
        damping: 8
      }
    }
  };

  interface BadgeVariants {
    [key: string]: any;
    hidden: { scale: number; opacity: number };
    visible: (i: number) => {
      scale: number;
      opacity: number;
      transition: {
        type: string;
        stiffness: number;
        delay: number;
      };
    };
  }

  const badgeVariants: BadgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 70,
        delay: 0.6 + (i * 0.1)
      }
    })
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 80,
        delay: 1.2
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const colorMap = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    sky: "bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    green: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
    pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-pink-200 dark:border-pink-800"
  };

  const getColorClasses = (color: keyof typeof colorMap): string => {
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="about" className="min-h-screen pt-16 pb-16 flex items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-32 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <motion.div 
          className="absolute top-1/4 left-1/5 w-4 h-4 bg-yellow-400 rounded-full"
          animate={{ 
            y: [0, 10, -10, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-400 rounded-full"
          animate={{ 
            y: [0, -15, 15, 0],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "40%" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 mb-4"
                />
                <motion.h2 
                  variants={itemVariants}
                  className="text-sm font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4 flex items-center leading-relaxed"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Full-Stack Developer And Data Analyst
                </motion.h2>
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                >
                  Crafting{" "}
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Digital Experiences
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200 dark:bg-blue-900/50 -z-10"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>{" "}
                  that Matter
                </motion.h1>
                <motion.p 
                  variants={itemVariants} 
                  className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg"
                >
                  I build beautiful, interactive, and performant web applications with modern technologies and a focus on user experience and analyze data to make informed decisions.
                </motion.p>
                
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-8"
                  variants={itemVariants}
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      custom={index}
                      variants={badgeVariants}
                      whileHover={{ 
                        scale: 1.1, 
                        transition: { type: 'spring', stiffness: 300 } 
                      }}
                    >
                      <Badge 
                        variant="outline" 
                        className={`${getColorClasses(skill.color)} px-3 py-1 text-sm font-medium border`}
                      >
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
                
                <div className="flex flex-wrap gap-4">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <a href="#contact" className="group px-5 flex items-center">
                        Contact Me
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      variant="outline" 
                      size="lg"
                      asChild
                      className="border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300"
                    >
                      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group px-4 flex items-center">
                        View Resume
                        <ExternalLink className="ml-1 h-4 w-4 transition-transform group-hover:translate-y-px group-hover:translate-x-px" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto max-w-md"
          >
            <motion.div
              className="relative z-20"
            >
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.4, stiffness: 50 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.1), 0 15px 15px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: 'spring', stiffness: 300 }
                }}
              >
                <div className="w-full h-full bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 absolute"></div>
                <motion.img 
                  src={image}
                  alt="Developer portrait" 
                  className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal dark:opacity-90"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                
                {/* Photo overlay effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0.2] }}
                  transition={{ duration: 2, times: [0, 0.7, 1] }}
                />
              </motion.div>
            </motion.div>
            
            {/* Experience badge with updated animation */}
            <motion.div 
              className="absolute -bottom-6 -right-6 z-30"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', delay: 0.6, stiffness: 100 }}
              whileHover={{ 
                y: -5,
                transition: { type: 'spring', stiffness: 400 }
              }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="text-center">
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400">1+ Years</p>
                  <p className="font-medium text-xs text-slate-500 dark:text-slate-400">Professional Experience</p>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-xl -z-10"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-green-500/10 rounded-full blur-xl -z-10"></div>
            
            {/* Grid pattern */}
            <motion.div 
              className="absolute -z-10 inset-0 translate-x-24 translate-y-24 scale-125 opacity-30 dark:opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.2, 0.3] }}
              transition={{ delay: 0.5, duration: 8, repeat: Infinity }}
            >
              <div className="w-full h-full bg-slate-100 dark:bg-slate-700 bg-grid-slate-300/[0.2] dark:bg-grid-slate-600/[0.2]"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}