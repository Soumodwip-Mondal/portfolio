'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
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
  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);
  
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
      scale: isFocused ? 1.03 : anyCardFocused ? 0.97 : 1,
        opacity: isFocused ? 1 : anyCardFocused ? 0.45 : 1,
        filter: isFocused ? 'brightness(1.08)' : anyCardFocused ? 'brightness(0.65)' : 'brightness(1)',
        transition: 'scale 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease, filter 0.35s ease'
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
        
        <CardHeader className="relative p-6 px-5 pb-0">
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <div className="shimmer bg-[#5dd7e6]/20 text-[#5dd7e6] text-[9px] font-bold uppercase tracking-widest py-1 px-3 rounded-full border border-[#5dd7e6]/30 backdrop-blur-md shadow-[0_0_18px_rgba(93,215,230,0.15)]">
                Featured
              </div>
            </div>
          )}
          <CardTitle className="text-lg font-bold tracking-tight text-white mb-2 leading-tight">{project.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm leading-relaxed text-zinc-500 font-light">{project.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow p-6 px-5 pt-5 pb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 bg-white/[0.03] border border-white/5 py-1 px-2.5 rounded-md hover:border-[#5dd7e6]/30 hover:text-white transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 px-5 border-t border-white/5 bg-white/[0.01]">
          <div className="w-full flex justify-between items-center">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              {project.date}
            </span>
            <button 
              className="text-[#5dd7e6] hover:text-white transition-colors duration-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group/btn"
              onClick={() => window.open(project.url, '_blank')}
            >
              <span className="relative pb-0.5 border-b border-transparent group-hover/btn:border-[#5dd7e6] transition-all">Project Details</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}