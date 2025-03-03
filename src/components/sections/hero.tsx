'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import AnimatedContainer from '../shared/animated-container';

export default function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <AnimatedContainer variants={containerVariants}>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4">
            Full-Stack <span className="text-blue-600 dark:text-blue-400">Developer</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">
            Building exceptional digital experiences with modern technologies
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">TypeScript</Badge>
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">React</Badge>
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Next.js</Badge>
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Tailwind CSS</Badge>
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">shadcn/ui</Badge>
          </motion.div>
          <motion.div variants={itemVariants} className="flex gap-4">
            <Button asChild>
              <a href="#contact">Contact Me</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
            </Button>
          </motion.div>
        </AnimatedContainer>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
            <img 
              src="/images/profile.jpg" 
              alt="Jane Smith portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg">
            <p className="font-mono text-sm">5+ years of experience</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}