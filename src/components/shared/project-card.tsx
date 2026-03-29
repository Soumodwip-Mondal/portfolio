'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';
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
        scale: isFocused ? 1.02 : anyCardFocused ? 0.98 : 1,
        opacity: isFocused ? 1 : anyCardFocused ? 0.5 : 1,
        filter: isFocused ? 'brightness(1.05)' : anyCardFocused ? 'brightness(0.7)' : 'brightness(1)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="relative group h-full"
    >
      <Card className="h-full overflow-hidden glass-card z-10 flex flex-col group/card">
        {project.imageUrl && (
          <div className="w-full h-32 overflow-hidden relative group">
            <OptimizedImage 
              src={project.imageUrl}
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Image overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        
        <CardHeader className="relative px-4 py-2">
          {project.featured && (
            <div className="absolute -top-3 -right-3 z-10">
              <Badge variant="default" className="bg-primary text-primary-foreground shadow-lg text-[10px] h-5 px-2">
                Featured
              </Badge>
            </div>
          )}
          <CardTitle className="text-[14px] leading-snug font-bold line-clamp-2 mb-1">{project.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-relaxed text-[#899295]">{project.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow px-4 py-0">
          <div className="flex flex-wrap gap-1.5 mt-1">
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
        
        <CardFooter className="px-4 py-2 border-t border-white/5 mt-auto bg-white/5">
          <div className="w-full flex justify-between items-center gap-2">
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              {project.date}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 hover:bg-[#5dd7e6]/10 hover:text-[#5dd7e6] hover:border-[#5dd7e6]/50 transition-all duration-300 relative overflow-hidden group border border-[#3f484a] text-[#bec8ca] bg-transparent backdrop-blur-sm"
              onClick={() => window.open(project.url, '_blank')}
            >
              <span className="relative z-10">View Project</span>
              <ExternalLink className="h-4 w-4 ml-1 relative z-10" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}