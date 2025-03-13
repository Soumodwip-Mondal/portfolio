'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../../components/ui/button';
import { Moon, Sun, Menu } from 'lucide-react';
import MobileMenu from './mobile-menu';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link to="/">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/profile.jpg" alt="Profile" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
          </Link>
          <span className="font-bold text-xl">Soumodwip Mondal</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-6"
        >
          <Button 
            variant="link" 
            className="p-0 hover:text-blue-500 transition-colors"
            onClick={() => scrollToSection('about')}
          >
            About
          </Button>
          
          <Button 
            variant="link" 
            className="p-0 hover:text-blue-500 transition-colors"
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </Button>
          
          <Button 
            variant="link" 
            className="p-0 hover:text-blue-500 transition-colors"
            onClick={() => scrollToSection('skills')}
          >
            Skills
          </Button>
          
          <Link to="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
          <Link to="/dashboard" className="hover:text-blue-500 transition-colors">View Dashboard</Link>
          
          <Button 
            variant="link" 
            className="p-0 hover:text-blue-500 transition-colors"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </motion.nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
    </header>
  );
}