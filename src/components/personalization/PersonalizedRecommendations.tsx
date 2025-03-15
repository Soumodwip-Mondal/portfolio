import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePersonalization } from '../../context/PersonalizationContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronRight, Sparkles, Code, Database, Paintbrush, Bot, Mic, Box } from 'lucide-react';
import { useScrollToSection } from '../../hooks/useScrollToSection';

// Map section IDs to display names and icons
const sectionInfo: Record<string, { name: string; icon: React.ReactNode; path?: string }> = {
  'projects': { 
    name: 'Projects', 
    icon: <Code className="h-5 w-5 text-blue-500" /> 
  },
  'skills': { 
    name: 'Skills', 
    icon: <Sparkles className="h-5 w-5 text-purple-500" /> 
  },
  'dashboard': { 
    name: 'Dashboard', 
    icon: <Database className="h-5 w-5 text-green-500" />,
    path: '/dashboard'
  },
  'collaborate': { 
    name: 'Collaborative Drawing', 
    icon: <Paintbrush className="h-5 w-5 text-amber-500" />,
    path: '/collaborate'
  },
  'ai-assistant': { 
    name: 'AI Assistant', 
    icon: <Bot className="h-5 w-5 text-indigo-500" />,
    path: '/ai-assistant'
  },
  'voice-control': { 
    name: 'Voice Control', 
    icon: <Mic className="h-5 w-5 text-red-500" />,
    path: '/voice-control'
  },
  'augmented-reality': { 
    name: 'Augmented Reality', 
    icon: <Box className="h-5 w-5 text-cyan-500" />
  }
};

export const PersonalizedRecommendations = () => {
  const { suggestedSections, topInterests, isReturningVisitor } = usePersonalization();
  const { scrollToSection } = useScrollToSection();
  const [expanded, setExpanded] = useState(false);
  
  // Only show recommendations for returning visitors or if we have detected interests
  if (!isReturningVisitor && topInterests.length === 0) {
    return null;
  }
  
  // Get recommendations (limit to 3 if not expanded)
  const recommendations = suggestedSections
    .filter(section => sectionInfo[section])
    .slice(0, expanded ? undefined : 3);
  
  if (recommendations.length === 0) {
    return null;
  }
  
  const handleSectionClick = (section: string) => {
    if (sectionInfo[section].path) {
      // Do nothing, will navigate via Link
    } else {
      scrollToSection(section);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        {suggestedSections.length > 3 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((section) => {
          const info = sectionInfo[section];
          
          return (
            <Card 
              key={section}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSectionClick(section)}
            >
              {info.path ? (
                <Link to={info.path} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{info.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Based on your interests
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </Link>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{info.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Based on your interests
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}; 