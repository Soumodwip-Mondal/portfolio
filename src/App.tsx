import { useState, createContext, useContext } from 'react';
import {  BrowserRouter as Router} from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/layout/header';
import Home from './app/page';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {isLoading && (
              <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            )}
            <Home />
          </main>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;