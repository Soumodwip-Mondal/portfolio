import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/layout/header';
import Home from './app/page';
import BlogPage from './pages/BlogPage';
import Dashboard from './components/sections/dashboard';
import CollaborativePage from './pages/CollaborativePage';
// import AIAssistantPage from './pages/AIAssistantPage';
import { VoiceNavigation } from './components/voice/VoiceNavigation';
import { PersonalizationProvider } from './context/PersonalizationContext';
// import { PersonalizedGreeting } from './components/personalization/PersonalizedGreeting';
import { ThemeCustomizer } from './components/personalization/ThemeCustomizer';
import { LayoutManager } from './components/personalization/LayoutManager';
import VoiceControlPage from './pages/VoiceControlPage';
// Scroll to top component
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const defaultContextValue = {
  viewMode: 'grid',
  setViewMode: (_value: string | ((val: string) => string)) => {},
  contactFormData: { name: '', email: '', message: '' },
  setContactFormData: (_value: React.SetStateAction<{ name: string; email: string; message: string; }>) => {},
  activeFilters: [] as string[],
  toggleFilter: (_filter: string) => {},
  clearFilters: () => {},
  isLoading: false,
  setIsLoading: (_value: React.SetStateAction<boolean>) => {},
};

export const AppContext = createContext(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

function App() {
  // Persist view mode preference in localStorage
  const [viewMode, setViewMode] = useLocalStorage('viewMode', 'grid');
  
  // Form data state
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // Filter state for projects/skills
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Global loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Toggle a filter on or off
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };
  const contextValue = {
    viewMode,
    setViewMode,
    contactFormData,
    setContactFormData,
    activeFilters,
    toggleFilter,
    clearFilters,
    isLoading,
    setIsLoading,
  };

  return (
    <PersonalizationProvider>
      <AppContext.Provider value={contextValue}>
        <LayoutManager>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">
                {isLoading && (
                  <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                )}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/collaborate" element={<CollaborativePage />} />
                  {/* <Route path="/ai-assistant" element={<AIAssistantPage />} /> */}
                  <Route path="/voice-control" element={<VoiceControlPage />} />
                  {/* Redirect any other routes to home */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              {/* <ChatAssistant /> */}
              <VoiceNavigation />
              {/* <PersonalizedGreeting /> */}
              <ThemeCustomizer />
            </div>
          </Router>
        </LayoutManager>
      </AppContext.Provider>
    </PersonalizationProvider>
  );
}

export default App;