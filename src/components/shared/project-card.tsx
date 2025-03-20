'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ExternalLink, Sparkles } from 'lucide-react';
import { OptimizedImage } from '../ui/optimized-image';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  isFocused?: boolean;
  anyCardFocused?: boolean;
}

export default function ProjectCard({ project, isFocused, anyCardFocused }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  // Mouse position for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Transform mouse position to rotate card slightly
  const rotateX = useTransform(springY, [-100, 100], [2, -2]);
  const rotateY = useTransform(springX, [-100, 100], [-2, 2]);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Optimize animations with useReducedMotion and conditional rendering
  const shouldReduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Enhanced diagonal border flow with complementary colors and dynamic speed based on focus
  const diagonalBorderVariants = {
    initial: {},
    animate: (custom: { isFocused: boolean, anyCardFocused: boolean }) => ({
      background: shouldReduceMotion 
        ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" 
        : [
          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
          "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",  
          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
        ],
      filter: custom.isFocused ? 'brightness(1.2)' : custom.anyCardFocused ? 'brightness(0.7)' : 'brightness(1)',
      transition: {
        duration: shouldReduceMotion ? 0 : custom.isFocused ? 3 : custom.anyCardFocused ? 6 : 4,
        repeat: shouldReduceMotion ? 0 : Infinity,
        repeatType: "reverse" as const
      }
    })
  };

  // Dynamic animations based on focus state handled inline

  return (
    <motion.div
      ref={cardRef}
      initial={isInView ? "visible" : "hidden"}
      animate="visible"
      variants={{
        hidden: { 
          opacity: 0, 
          y: 20 
        },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: 'spring', 
            stiffness: 100,
            duration: 0.5
          }
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        scale: isFocused ? 1.05 : anyCardFocused ? 0.95 : 1,
        opacity: isFocused ? 1 : anyCardFocused ? 0.6 : 1,
        filter: isFocused ? 'brightness(1.1)' : anyCardFocused ? 'brightness(0.8) blur(1px)' : 'brightness(1)',
        transition: 'all 0.4s ease-out'
      }}
      className="relative group h-full"
    >
      {/* Optimized border animation with diagonal color flow */}
      <motion.div 
        className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 z-[-1] p-[2px]"
        initial="initial"
        animate="animate"
        variants={diagonalBorderVariants}
        custom={{ isFocused, anyCardFocused }}
      >
        {/* Top left corner accent with enhanced glow */}
        <motion.div 
          className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-tl-lg"
          initial="initial"
          animate={{
            scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
            opacity: shouldReduceMotion ? 0.8 : [0.7, 1, 0.7],
            boxShadow: shouldReduceMotion 
              ? "0 0 10px rgba(59, 130, 246, 0.5)" 
              : [
                "0 0 10px rgba(59, 130, 246, 0.5)", 
                "0 0 20px rgba(59, 130, 246, 0.8)", 
                "0 0 10px rgba(59, 130, 246, 0.5)"
              ]
          }}
          transition={{ 
            duration: 2, 
            repeat: shouldReduceMotion ? 0 : Infinity, 
            repeatType: "reverse" as const 
          }}
          style={{
            filter: isFocused ? 'brightness(1.2)' : anyCardFocused ? 'brightness(0.7)' : 'brightness(1)'
          }}
        />
        
        {/* Bottom right corner accent with enhanced glow */}
        <motion.div 
          className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-amber-500 to-orange-600 rounded-br-lg"
          initial="initial"
          animate={{
            scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
            opacity: shouldReduceMotion ? 0.8 : [0.7, 1, 0.7],
            boxShadow: shouldReduceMotion 
              ? "0 0 10px rgba(245, 158, 11, 0.5)" 
              : [
                "0 0 10px rgba(245, 158, 11, 0.5)", 
                "0 0 20px rgba(245, 158, 11, 0.8)", 
                "0 0 10px rgba(245, 158, 11, 0.5)"
              ]
          }}
          transition={{ 
            duration: 2.2, 
            repeat: shouldReduceMotion ? 0 : Infinity, 
            repeatType: "reverse" as const 
          }}
          style={{
            filter: isFocused ? 'brightness(1.2)' : anyCardFocused ? 'brightness(0.7)' : 'brightness(1)'
          }}
        />
      </motion.div>
      
      <Card className="h-full overflow-hidden backdrop-blur-sm bg-card/80 border-none z-10">
        {project.imageUrl && (
          <div className="w-full h-48 overflow-hidden relative group">
            <OptimizedImage 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Image overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        
        <CardHeader className="relative">
          {project.featured && (
            <div className="absolute -top-3 -right-3 z-10">
              <Badge variant="default" className="bg-primary text-primary-foreground flex items-center gap-1 shadow-lg">
                <Sparkles className="h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}
          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
          <CardDescription className="mt-2 line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 border-t">
          <div className="w-full flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {project.date}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 relative overflow-hidden group"
              onClick={() => window.open(project.url, '_blank')}
            >
              <span className="relative z-10">View Project</span>
              <ExternalLink className="h-4 w-4 ml-1 relative z-10" />
              {/* Button hover effect */}
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}