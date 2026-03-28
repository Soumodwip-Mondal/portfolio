'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollToSection } from '../../hooks/useScrollToSection';

const MobileMenu = lazy(() => import('./mobile-menu'));

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollToSection } = useScrollToSection();
  const location = useLocation();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return null;


  const navLinks = [
    { to: '#about',    label: 'About',     section: 'about'    },
    { to: '#projects', label: 'Projects',  section: 'projects' },
    { to: '#skills-3d',label: 'Skills',    section: 'skills-3d' },
    { to: '/blog',     label: 'Blog'                           },
    { to: '/dashboard',label: 'Dashboard'                     },
    { to: '/collaborate', label: 'Draw'                       },
    { to: '#contact',  label: 'Contact',   section: 'contact'  },
  ];

  const isActive = (link: { to: string; section?: string }) => {
    if (link.section) return false; // handled by scroll
    return location.pathname === link.to;
  };

  return (
    <>
      {/* ── Floating Pill Nav ── */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-5 z-50 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-auto transition-all duration-300"
      >
        <nav
          className={`
            flex items-center justify-between md:justify-center gap-2 px-5 py-2.5 rounded-full w-full
            border border-white/10
            bg-white/5 backdrop-blur-2xl
            shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]
            inner-glow transition-all duration-300
            ${scrolled ? 'bg-white/10 border-white/20 shadow-[0_8px_40px_0_rgba(0,0,0,0.9)]' : ''}
          `}
        >
          {/* Left Side Spacer for mobile balance */}
          <div className="md:hidden w-8" />

          {/* Desktop Links - Center/Right */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => {
                    if (link.section) {
                      e.preventDefault();
                      scrollToSection(link.section);
                    }
                  }}
                  className={`
                    relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${active
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                    }
                  `}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-cyan-400/10 border border-cyan-400/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger - Right aligned */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1   }}
                exit={{    opacity: 0, rotate:  90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <Suspense fallback={null}>
          <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </Suspense>
      )}
    </>
  );
}