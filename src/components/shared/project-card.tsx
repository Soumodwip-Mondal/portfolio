'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  isHovered?: boolean;
}

export default function ProjectCard({ project, isHovered }: ProjectCardProps) {
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

  
  // Shimmer effect for card when in view
  const shimmerVariants = {
    hidden: {
      backgroundPosition: '200% 0',
      opacity: 0
    },
    visible: {
      backgroundPosition: '-200% 0',
      opacity: 0.1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror" as const,
        duration: 3,
        ease: "linear"
      }
    }
  };
  // Card entrance animation
  const entranceVariants = {
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
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate="visible"
      variants={entranceVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full perspective-1000"
    >
      <motion.div 
        className="relative h-full transform-gpu"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          scale: isHovered === true ? 1.05 : isHovered === false ? 0.95 : 1,
          y: isHovered === true ? -10 : 0,
          zIndex: isHovered === true ? 20 : 0,
          opacity: isHovered === false ? 0.6 : 1,
          filter: isHovered === false ? "blur(1px)" : "blur(0px)",
          transition: 'all 0.3s ease'
        }}
      >
        {/* Shimmer effect when card comes into view */}
        {isInView && (
          <motion.div 
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" 
            style={{ backgroundSize: '200% 100%' }}
            variants={shimmerVariants}
            initial="hidden"
            animate="visible"
          />
        )}
        
        {/* Solid border animation */}
        {isHovered === true && (
          <div className="absolute -inset-[5px] z-0 rounded-xl overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <motion.rect
                width="100%"
                height="100%"
                rx="16"
                ry="16"
                fill="none"
                strokeWidth="1"
                stroke="url(#solid-gradient)"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />

              <motion.rect
                width="100%"
                height="100%"
                rx="16"
                ry="16"
                fill="none"
                strokeWidth="2"
              >
                <animate
                  attributeName="stroke"
                  values="#6366f1;#8b5cf6;#ec4899;#6366f1"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </motion.rect>

              <motion.rect
                width="100%"
                height="100%"
                rx="16"
                ry="16"
                fill="none"
                strokeWidth="2"
                stroke="url(#flowing-solid-gradient)"
              >
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-1 0; 1 0; -1 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </motion.rect>

              <defs>
                <linearGradient id="solid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>

                <linearGradient id="flowing-solid-gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="200%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        
        <Card className={`h-full flex flex-col overflow-hidden border-4 bg-card/80 backdrop-blur-sm transition-all duration-300 z-10 relative ${isHovered === true ? 'shadow-xl shadow-primary/20' : ''}`}>
          {project.imageUrl && (
            <div className="w-full h-48 overflow-hidden relative group">
              <img 
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
    </motion.div>
  );
}