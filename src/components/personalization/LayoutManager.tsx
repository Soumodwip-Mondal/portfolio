import React, { useEffect } from 'react';
import { usePersonalization } from '../../context/PersonalizationContext';

// CSS variables for different layouts
const layoutStyles = {
  default: {
    '--content-width': '100%',
    '--section-spacing': '4rem',
    '--card-padding': '1.5rem',
    '--text-base-size': '1rem',
    '--heading-scale': '1',
  },
  compact: {
    '--content-width': '90%',
    '--section-spacing': '2.5rem',
    '--card-padding': '1rem',
    '--text-base-size': '0.875rem',
    '--heading-scale': '0.9',
  },
  spacious: {
    '--content-width': '90%',
    '--section-spacing': '6rem',
    '--card-padding': '2rem',
    '--text-base-size': '1.125rem',
    '--heading-scale': '1.1',
  }
};

export const LayoutManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { preferences } = usePersonalization();
  
  // Apply layout styles when preferences change
  useEffect(() => {
    const { layout } = preferences;
    const styles = layoutStyles[layout];
    
    // Apply CSS variables
    Object.entries(styles).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value as string);
    });
    
    // Add layout class to document
    document.documentElement.dataset.layout = layout;
    
    // Add CSS to handle layout changes
    const styleElement = document.createElement('style');
    styleElement.id = 'layout-styles';
    
    // Define layout-specific styles
    styleElement.textContent = `
      /* Base layout adjustments */
      :root[data-layout] .container {
        width: var(--content-width);
        max-width: 1400px;
      }
      
      :root[data-layout] section {
        margin-bottom: var(--section-spacing);
      }
      
      :root[data-layout] .card {
        padding: var(--card-padding);
      }
      
      /* Text size adjustments */
      :root[data-layout] {
        font-size: var(--text-base-size);
      }
      
      :root[data-layout] h1 {
        font-size: calc(2.25rem * var(--heading-scale));
      }
      
      :root[data-layout] h2 {
        font-size: calc(1.875rem * var(--heading-scale));
      }
      
      :root[data-layout] h3 {
        font-size: calc(1.5rem * var(--heading-scale));
      }
      
      /* Specific layout adjustments */
      :root[data-layout="compact"] .grid {
        gap: 0.75rem !important;
      }
      
      :root[data-layout="compact"] .card {
        border-radius: 0.375rem;
      }
      
      :root[data-layout="spacious"] .grid {
        gap: 2rem !important;
      }
      
      :root[data-layout="spacious"] .card {
        border-radius: 1rem;
      }
    `;
    
    // Remove any existing layout styles
    const existingStyle = document.getElementById('layout-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Add new styles
    document.head.appendChild(styleElement);
    
    return () => {
      // Clean up
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [preferences.layout]);
  
  return <>{children}</>;
}; 