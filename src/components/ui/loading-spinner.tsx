'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      <div className="relative">
        {/* Background circle */}
        <div className="w-20 h-20 rounded-full bg-gray-100/30" />
        
        {/* Outer glow effect */}
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 rounded-full bg-primary/10"
          animate={{ 
            boxShadow: ['0 0 0 0 rgba(var(--primary), 0.2)', '0 0 0 10px rgba(var(--primary), 0)', '0 0 0 0 rgba(var(--primary), 0.2)']
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main spinner arc */}
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 border-4 border-primary border-t-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Secondary spinner (opposite direction) */}
        <motion.div
          className="absolute top-2 left-2 w-16 h-16 border-4 border-primary/40 border-b-transparent border-r-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Loading text with ellipsis */}
      <p className="mt-5 text-gray-700 font-medium text-sm">Loading...</p>
    </div>
  );
}