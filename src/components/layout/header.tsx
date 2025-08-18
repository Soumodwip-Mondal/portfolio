'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../../components/ui/button';
import { Moon, Sun, Menu, Paintbrush, User, Code, Lightbulb, Newspaper, LayoutDashboard, Mail } from 'lucide-react';
import { useScrollToSection } from '../../hooks/useScrollToSection';
// Lazy load non-critical components
const MobileMenu = lazy(() => import('./mobile-menu'));

// Import image with explicit width and height for better CLS
import image from '../../assets/Hello.png';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Memoize navigation links for performance
  const navLinks = [
    { to: "#about", icon: <User className="h-4 w-4 mr-1" />, label: "About", section: 'about' },
    { to: "#projects", icon: <Code className="h-4 w-4 mr-1" />, label: "Projects", section: 'projects' },
    { to: "#skills", icon: <Lightbulb className="h-4 w-4 mr-1" />, label: "Skills", section: 'skills' },
    { to: "/blog", icon: <Newspaper className="h-4 w-4 mr-1" />, label: "Blog" },
    { to: "/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-1" />, label: "Dashboard" },
    { to: "/collaborate", icon: <Paintbrush className="h-4 w-4 mr-1" />, label: "Draw" },
    { to: "#contact", icon: <Mail className="h-4 w-4 mr-1" />, label: "Contact", section: 'contact' }
  ];

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
            <Avatar className="h-12 w-12">
              <AvatarImage src={image} alt="Profile" width={48} height={48} loading="eager" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
          </Link>
          <span className="font-bold text-xl hidden md:block">Soumodwip Mondal</span>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-6"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className="text-base hover:text-blue-500 transition-colors flex items-center"
              onClick={(e) => {
                if (link.section) {
                  e.preventDefault();
                  scrollToSection(link.section);
                }
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </motion.nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu - Only render when needed */}
      {menuOpen && (
        <Suspense fallback={<div className="h-64 w-full bg-white/80 dark:bg-slate-900/80 animate-pulse"></div>}>
          <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </Suspense>
      )}
    </header>
  );
}