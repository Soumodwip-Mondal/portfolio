'use client';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useScrollToSection } from '../../hooks/useScrollToSection';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { theme, setTheme } = useTheme();
  const { scrollToSection } = useScrollToSection();
  
  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        >
          <nav className="flex flex-col p-4">
            <Button 
              variant="link" 
              className="justify-start p-0 py-2 hover:text-blue-500 transition-colors"
              onClick={() => handleSectionClick('about')}
            >
              About
            </Button>
            
            <Button 
              variant="link" 
              className="justify-start p-0 py-2 hover:text-blue-500 transition-colors"
              onClick={() => handleSectionClick('projects')}
            >
              Projects
            </Button>
            
            <Button 
              variant="link" 
              className="justify-start p-0 py-2 hover:text-blue-500 transition-colors"
              onClick={() => handleSectionClick('skills')}
            >
              Skills
            </Button>
            
            <Link 
              to="/blog" 
              className="py-2 hover:text-blue-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            
            <Button 
              variant="link" 
              className="justify-start p-0 py-2 hover:text-blue-500 transition-colors"
              onClick={() => handleSectionClick('contact')}
            >
              Contact
            </Button>
            
            <div className="flex items-center mt-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <span className="ml-2">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}