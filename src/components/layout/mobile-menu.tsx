import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToSection } from '../../hooks/useScrollToSection';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const { scrollToSection } = useScrollToSection();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const sectionLinks = [
    { label: 'About',   section: 'about'   },
    { label: 'Projects',section: 'projects' },
    { label: 'Skills',  section: 'skills-3d' },
    { label: 'Contact', section: 'contact' },
  ];

  const pageLinks = [
    { to: '/blog',        label: 'Blog'      },
    { to: '/dashboard',   label: 'Dashboard' },
    { to: '/collaborate', label: 'Draw'      },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="
              fixed top-[4.5rem] z-40
              inset-x-4 max-w-lg md:mx-auto
              glass-card rounded-2xl border border-white/10
              shadow-[0_20px_50px_rgba(0,0,0,0.3)]
              p-5 md:hidden inner-glow
            "
          >
            <div className="grid grid-cols-2 gap-2">
              {/* Force all links to show in a clean grid */}
              {sectionLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => { setIsOpen(false); scrollToSection(link.section); }}
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
              {pageLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}