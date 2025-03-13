import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useScrollToSection() {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle hash changes and scroll to the section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Function to navigate to a section
  const scrollToSection = (sectionId: string) => {
    // If we're already on the home page
    if (location.pathname === '/') {
      // Update the URL with the hash
      navigate(`/#${sectionId}`, { replace: true });
      
      // Manually scroll to the element
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // If we're on another page, navigate to home with the hash
      navigate(`/#${sectionId}`);
    }
  };

  return { scrollToSection };
} 