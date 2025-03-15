import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalization, ThemeOption, LayoutOption } from '../../context/PersonalizationContext';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { 
  Settings, 
  X, 
  Sun, 
  Moon, 
  Palette, 
  LayoutGrid, 
  LayoutList, 
  Maximize, 
  Check 
} from 'lucide-react';

export const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, setTheme, setLayout } = usePersonalization();
  const { setTheme: setNextTheme } = useTheme();
  
  const themes: { value: ThemeOption; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'purple', label: 'Purple', icon: <Palette className="h-4 w-4 text-purple-500" /> },
    { value: 'blue', label: 'Blue', icon: <Palette className="h-4 w-4 text-blue-500" /> },
    { value: 'green', label: 'Green', icon: <Palette className="h-4 w-4 text-green-500" /> },
  ];
  
  const layouts: { value: LayoutOption; label: string; icon: React.ReactNode }[] = [
    { value: 'default', label: 'Default', icon: <LayoutGrid className="h-4 w-4" /> },
    { value: 'compact', label: 'Compact', icon: <LayoutList className="h-4 w-4" /> },
    { value: 'spacious', label: 'Spacious', icon: <Maximize className="h-4 w-4" /> },
  ];
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  // Apply theme when component mounts or preferences change
  useEffect(() => {
    applyTheme(preferences.theme);
  }, [preferences.theme]);
  
  const handleThemeChange = (theme: ThemeOption) => {
    setTheme(theme);
    applyTheme(theme);
  };
  
  const applyTheme = (theme: ThemeOption) => {
    // Apply theme changes
    if (theme === 'light' || theme === 'dark') {
      // Use next-themes for light/dark mode
      setNextTheme(theme);
      
      // Reset custom theme variables
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--primary-foreground');
    } else {
      // For custom themes, set light mode as base
      setNextTheme('light');
      
      // Apply custom theme colors using HSL values to match Tailwind CSS variables
      if (theme === 'purple') {
        document.documentElement.style.setProperty('--primary', '270 70% 60%');
        document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%');
      } else if (theme === 'blue') {
        document.documentElement.style.setProperty('--primary', '210 100% 50%');
        document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%');
      } else if (theme === 'green') {
        document.documentElement.style.setProperty('--primary', '142 70% 45%');
        document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%');
      }
    }
  };
  
  const handleLayoutChange = (layout: LayoutOption) => {
    setLayout(layout);
    
    // Apply layout changes
    document.documentElement.dataset.layout = layout;
  };
  
  return (
    <>
      {/* Floating button - adjusted position to avoid overlap with AI assistant */}
      <motion.button
       className="fixed bottom-24 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg"
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Customize theme and layout"
      >
        <Settings className="h-5 w-5" />
      </motion.button>
      
      {/* Customization panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Customize Experience</h2>
                <Button variant="ghost" size="sm" onClick={toggleOpen}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Theme selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <Button
                      key={theme.value}
                      variant={preferences.theme === theme.value ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleThemeChange(theme.value)}
                    >
                      <div className="flex items-center">
                        {theme.icon}
                        <span className="ml-2">{theme.label}</span>
                      </div>
                      {preferences.theme === theme.value && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Layout selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Layout</h3>
                <div className="grid grid-cols-1 gap-3">
                  {layouts.map((layout) => (
                    <Button
                      key={layout.value}
                      variant={preferences.layout === layout.value ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleLayoutChange(layout.value)}
                    >
                      <div className="flex items-center">
                        {layout.icon}
                        <span className="ml-2">{layout.label}</span>
                      </div>
                      {preferences.layout === layout.value && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your preferences will be saved for your next visit.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}; 