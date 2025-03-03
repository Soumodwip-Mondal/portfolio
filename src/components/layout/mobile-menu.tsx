'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { theme, setTheme } = useTheme();
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden py-4 px-6 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="flex flex-col space-y-4">
            <a href="#about" className="hover:text-blue-500 transition-colors" onClick={handleLinkClick}>About</a>
            <a href="#projects" className="hover:text-blue-500 transition-colors" onClick={handleLinkClick}>Projects</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors" onClick={handleLinkClick}>Skills</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors" onClick={handleLinkClick}>Contact</a>
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="justify-start">
              {theme === 'dark' ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}