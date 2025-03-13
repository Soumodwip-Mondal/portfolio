'use client';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollToSection } = useScrollToSection();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About/Bio Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Soumodwip Mondal</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              A passionate developer focused on creating intuitive and efficient web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                onClick={() => scrollToSection('about')}
              >
                About
              </Button>
              
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                onClick={() => scrollToSection('projects')}
              >
                Projects
              </Button>
              
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                onClick={() => scrollToSection('skills')}
              >
                Skills
              </Button>
              
              <Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
                Blog
              </Link>
              
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </Button>
            </nav>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Soumodwip-Mondal" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com/in/soumodwip-mondal-805243298" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/SouravMond17180" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:msoumodwip485@gmail.com" aria-label="Email">
                  <Mail size={20} />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>© {currentYear} Soumodwip Mondal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}