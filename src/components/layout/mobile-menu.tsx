import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Moon, Sun, X} from 'lucide-react';
import { useScrollToSection } from '../../hooks/useScrollToSection';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollToSection } = useScrollToSection();

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []); 
  if (!mounted) return null;

  const handleLinkClick = (sectionId: string) => {
    setIsOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="bg-white dark:bg-slate-900 p-4 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                variant="ghost" 
                className="justify-start text-base"
                onClick={() => handleLinkClick('about')}
              >
                About
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start text-base"
                onClick={() => handleLinkClick('projects')}
              >
                Projects
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start text-base"
                onClick={() => handleLinkClick('skills')}
              >
                Skills
              </Button>
              
              <Link 
                to="/blog" 
                className="px-4 py-2 text-base rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              
              <Link 
                to="/dashboard" 
                className="px-4 py-2 text-base rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              
              <Link 
                to="/collaborate" 
                className="px-4 py-2 text-base rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                Collaborative Drawing
              </Link>
              <Link 
                to="/ai-assistant" 
                className="px-4 py-2 text-base rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                AI Assistant
              </Link>
              <Link 
                to="/voice-control" 
                className="px-4 py-2 text-base rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                Voice Control
              </Link>
              <Button 
                variant="ghost" 
                className="justify-start text-base"
                onClick={() => handleLinkClick('contact')}
              >
                Contact
              </Button>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Theme</span>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}