'use client';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export default function Footer() {
  const { scrollToSection } = useScrollToSection();

  return (
    <footer className="bg-[#0e0e0e] border-t border-[#3f484a]/30 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About/Bio Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#e5e2e1]">Soumodwip Mondal</h3>
            <p className="text-[#899295] mb-4 text-sm leading-relaxed">
              A passionate developer focused on creating intuitive and efficient web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#e5e2e1]">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-[#899295] hover:text-[#5dd7e6] transition-colors"
                onClick={() => scrollToSection('about')}
              >
                About
              </Button>
              
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-[#899295] hover:text-[#5dd7e6] transition-colors"
                onClick={() => scrollToSection('projects')}
              >
                Projects
              </Button>
              
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-[#899295] hover:text-[#5dd7e6] transition-colors"
                onClick={() => scrollToSection('skills')}
              >
                Skills
              </Button>
              
              <Link to="/blog" className="text-[#899295] hover:text-[#5dd7e6] transition-colors text-sm">
                Blog
              </Link>
              
              <Button 
                variant="link" 
                className="h-auto p-0 justify-start text-[#899295] hover:text-[#5dd7e6] transition-colors"
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

      </div>
    </footer>
  );
}