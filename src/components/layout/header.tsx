'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../../components/ui/button';
import { Moon, Sun, Menu, Paintbrush, Bot, Mic, User, Code, Lightbulb, Newspaper, LayoutDashboard, Mail } from 'lucide-react';
import MobileMenu from './mobile-menu';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { GamificationButton } from '../gamification/GamificationButton';

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
          <Link to="#about" className="text-base hover:text-blue-500 transition-colors flex items-center" 
                onClick={(e) => {e.preventDefault(); scrollToSection('about');}}>
            <User className="h-4 w-4 mr-1" />
            About
          </Link>
          
          <Link to="#projects" className="text-base hover:text-blue-500 transition-colors flex items-center"
                onClick={(e) => {e.preventDefault(); scrollToSection('projects');}}>
            <Code className="h-4 w-4 mr-1" />
            Projects
          </Link>
          
          <Link to="#skills" className="text-base hover:text-blue-500 transition-colors flex items-center"
                onClick={(e) => {e.preventDefault(); scrollToSection('skills');}}>
            <Lightbulb className="h-4 w-4 mr-1" />
            Skills
          </Link>
          
          <Link to="/blog" className="text-base hover:text-blue-500 transition-colors flex items-center">
            <Newspaper className="h-4 w-4 mr-1" />
            Blog
          </Link>
          
          <Link to="/dashboard" className="text-base hover:text-blue-500 transition-colors flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
          
          <Link to="/collaborate" className="text-base hover:text-blue-500 transition-colors flex items-center">
            <Paintbrush className="h-4 w-4 mr-1" />
            Draw
          </Link>
          
          <Link to="/ai-assistant" className="text-base hover:text-blue-500 transition-colors flex items-center">
            <Bot className="h-4 w-4 mr-1" />
            AI Assistant
          </Link>
          
          <Link to="/voice-control" className="text-base hover:text-blue-500 transition-colors flex items-center">
            <Mic className="h-4 w-4 mr-1" />
            Voice Control
          </Link>
          
          <Link to="#contact" className="text-base hover:text-blue-500 transition-colors flex items-center"
                onClick={(e) => {e.preventDefault(); scrollToSection('contact');}}>
            <Mail className="h-4 w-4 mr-1" />
            Contact
          </Link>
          
          <GamificationButton />
          
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </motion.nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <GamificationButton />
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