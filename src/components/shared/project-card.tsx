'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { type: 'spring', stiffness: 200 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
        {project.imageUrl && (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
            {project.featured && (
              <Badge variant="default" className="bg-primary text-primary-foreground ml-2">
                Featured
              </Badge>
            )}
          </div>
          <CardDescription className="mt-2 line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
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
              className="flex items-center gap-1 hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open(project.url, '_blank')}
            >
              View Project
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}