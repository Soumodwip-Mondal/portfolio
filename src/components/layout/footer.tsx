'use client';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About/Bio Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Your Name</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              A passionate developer focused on creating intuitive and efficient web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">About</a>
              <a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Projects</a>
              <a href="#skills" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Skills</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Contact</a>
            </nav>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:your.email@example.com" aria-label="Email">
                  <Mail size={20} />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>© {currentYear} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}