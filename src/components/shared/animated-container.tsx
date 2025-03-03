'use client';

import React from 'react';
import { motion, Variant, Variants } from 'framer-motion';

interface AnimatedContainerProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export default function AnimatedContainer({ 
  children, 
  variants, 
  className = '', 
  delay = 0 
}: AnimatedContainerProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}