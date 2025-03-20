'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { X, Briefcase, Sparkles, MessageCircle } from 'lucide-react';

interface HireMePopupProps {
  timeToShow?: number; // Time in milliseconds before showing the popup
}

export default function HireMePopup({ timeToShow = 45000 }: HireMePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Set timer to show popup after specified time
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, timeToShow);

    return () => clearTimeout(timer);
  }, [timeToShow]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Only dismisses for the current session, not stored in sessionStorage
  };

  const handleLikeClick = () => {
    // You could add analytics tracking here
    window.open('https://github.com/yourusername', '_blank');
    handleDismiss();
  };

  const handleHireClick = () => {
    // Redirect to contact section or open email
    window.location.href = '#contact';
    handleDismiss();
  };

  const handleImproveClick = () => {
    // Redirect to contact section
    window.location.href = '#contact';
    handleDismiss();
  };

  if (isDismissed) return null;

  // Floating petal animation variants
  const floatingPetalVariants = {
    initial: (i: number) => ({
      opacity: 0,
      scale: 0,
      y: 20,
      rotate: 0,
      x: i % 2 === 0 ? -10 : 10,
    }),
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0.5, 0],
      y: -100,
      rotate: i % 2 === 0 ? [0, 180, 360] : [0, -180, -360],
      x: i % 2 === 0 ? [-40, -20, -30] : [40, 20, 30],
      transition: {
        duration: 4,
        delay: i * 0.3,
        repeat: Infinity,
        repeatDelay: 1,
      },
    }),
  };

  // Bear wiggle animation for the main bear
  const bearWiggleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [-3, 3, -3],
      y: [0, -2, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20 
          }}
        >
          <div className="relative">
            {/* Animated border with diagonal color flow */}
            <div className="absolute -inset-[10px] rounded-2xl overflow-hidden">
              <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                {/* Diagonal gradient border animation */}
                <motion.rect
                  width="100%"
                  height="100%"
                  rx="16"
                  ry="16"
                  fill="none"
                  strokeWidth="10"
                  stroke="url(#diagonal-gradient)"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;500"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </motion.rect>

                {/* Pulsing corner accents */}
                <circle cx="16" cy="16" r="5" fill="#4f46e5">
                  <animate
                    attributeName="r"
                    values="5;8;5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="calc(100% - 16px)" cy="calc(100% - 16px)" r="5" fill="#ec4899">
                  <animate
                    attributeName="r"
                    values="5;8;5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Shimmering light effect */}
                <motion.rect
                  width="100%"
                  height="100%"
                  rx="16"
                  ry="16"
                  fill="none"
                  strokeWidth="2"
                  stroke="url(#shimmer-gradient)"
                  strokeDasharray="10 20"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;30"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </motion.rect>

                <defs>
                  {/* Diagonal gradient with complementary colors */}
                  <linearGradient id="diagonal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5">
                      <animate
                        attributeName="stop-color"
                        values="#4f46e5;#8b5cf6;#4f46e5"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#f59e0b">
                      <animate
                        attributeName="stop-color"
                        values="#f59e0b;#ef4444;#f59e0b"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>

                  {/* Shimmer gradient */}
                  <linearGradient id="shimmer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Popup content */}
            <div className="bg-card/90 backdrop-blur-md p-4 rounded-xl shadow-lg relative z-10 w-[280px] overflow-visible">
              <button 
                onClick={handleDismiss}
                className="absolute -top-3 -right-3 bg-card rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors shadow-md hover:shadow-lg"
                aria-label="Close popup"
              >
                <X size={16} />
              </button>
              
              {/* Floating petal animations around the popup */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={floatingPetalVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute text-amber-700 opacity-70"
                  style={{
                    top: i < 3 ? '0%' : i < 6 ? '50%' : i < 9 ? '100%' : '50%',
                    left: i < 3 ? `${25 + i * 20}%` : i < 6 ? '100%' : i < 9 ? `${75 - ((i-6) * 20)}%` : '0%',
                  }}
                >
                  {/* Flower Petal SVG - different for each petal */}
                  {i % 5 === 0 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C15 6 15 11 12 15C9 11 9 6 12 2Z" fill="#EC4899" />
                      <path d="M12 15C15 11 20 11 24 15C20 19 15 19 12 15Z" fill="#EC4899" />
                      <path d="M12 15C9 19 4 19 0 15C4 11 9 11 12 15Z" fill="#EC4899" />
                    </svg>
                  )}
                  {i % 5 === 1 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#8B5CF6" />
                    </svg>
                  )}
                  {i % 5 === 2 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="5" fill="#F59E0B" />
                      <path d="M12 3L13 7L17 8L13 9L12 13L11 9L7 8L11 7L12 3Z" fill="#F59E0B" />
                    </svg>
                  )}
                  {i % 5 === 3 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3C14 7 18 9 22 9C18 9 14 11 12 15C10 11 6 9 2 9C6 9 10 7 12 3Z" fill="#6366F1" />
                    </svg>
                  )}
                  {i % 5 === 4 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13 6 16 9 20 10C16 11 13 14 12 18C11 14 8 11 4 10C8 9 11 6 12 2Z" fill="#EF4444" />
                    </svg>
                  )}
                </motion.div>
              ))}

              {/* Cute bear icon with wiggle animation */}
              <div className="flex justify-center mb-2">
                <motion.div
                  className="text-amber-700 p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 shadow-lg"
                  variants={bearWiggleVariants}
                  initial="initial"
                  animate="animate"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-700">
                    {/* Bear ears */}
                    <circle cx="7" cy="6" r="2" fill="currentColor" />
                    <circle cx="17" cy="6" r="2" fill="currentColor" />
                    
                    {/* Bear face */}
                    <circle cx="12" cy="12" r="8" fill="#D4A676" />
                    
                    {/* Inner ears */}
                    <circle cx="7" cy="6" r="0.8" fill="#F8E3C5" />
                    <circle cx="17" cy="6" r="0.8" fill="#F8E3C5" />
                    
                    {/* Bear muzzle */}
                    <circle cx="12" cy="14" r="5" fill="#F8E3C5" />
                    
                    {/* Bear eyes */}
                    <circle cx="9" cy="10" r="1" fill="#4B3621" />
                    <circle cx="15" cy="10" r="1" fill="#4B3621" />
                    <circle cx="9" cy="9.7" r="0.3" fill="white" />
                    <circle cx="15" cy="9.7" r="0.3" fill="white" />
                    
                    {/* Bear nose */}
                    <circle cx="12" cy="12.5" r="1.2" fill="#4B3621" />
                    
                    {/* Bear mouth */}
                    <path d="M10 14.5C11 15.5 13 15.5 14 14.5" stroke="#4B3621" strokeWidth="0.7" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              <h3 className="text-lg font-bold mb-1 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Enjoying My Portfolio?</h3>
              
              <motion.div 
                className="mb-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-muted-foreground text-sm">What would you like to do next?</p>
              </motion.div>

              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleLikeClick}
                    className="w-full h-8 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center gap-1 group"
                    size="sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-125 transition-transform">
                      {/* Mini bear for button */}
                      <circle cx="12" cy="12" r="8" fill="white" />
                      <circle cx="9" cy="10" r="1" fill="#4B3621" />
                      <circle cx="15" cy="10" r="1" fill="#4B3621" />
                      <circle cx="12" cy="12.5" r="1" fill="#4B3621" />
                      <path d="M10 14.5C11 15.5 13 15.5 14 14.5" stroke="#4B3621" strokeWidth="0.7" strokeLinecap="round" />
                    </svg>
                    <span>I Like Your Work!</span>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleHireClick}
                    className="w-full h-8 text-xs bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white flex items-center justify-center gap-1 group relative overflow-hidden"
                    variant="default"
                    size="sm"
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      <Briefcase className="h-3 w-3 group-hover:scale-110 transition-transform" />
                      <span>I'd Like to Hire You!</span>
                    </span>
                    <span className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="text-yellow-200 h-2 w-2 animate-pulse" />
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleImproveClick}
                    className="w-full h-8 text-xs bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white flex items-center justify-center gap-1 group relative overflow-hidden"
                    variant="default"
                    size="sm"
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      <MessageCircle className="h-3 w-3 group-hover:scale-110 transition-transform" />
                      <span>What Can I Improve?</span>
                    </span>
                    <span className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="text-yellow-200 h-2 w-2 animate-pulse" />
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
