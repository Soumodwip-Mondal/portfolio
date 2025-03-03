import { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';

// Import components
import Header from './components/layout/header';
import Home from './app/page';
// import footer from './components/layout/footer';
// import HomePage from './pages/HomePage';
// import ProjectsPage from './pages/ProjectsPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';

// Create context
const defaultContextValue = {
  viewMode: 'grid',
  setViewMode: (value: string | ((val: string) => string)) => {},
  contactFormData: { name: '', email: '', message: '' },
  setContactFormData: (value: React.SetStateAction<{ name: string; email: string; message: string; }>) => {},
  activeFilters: [] as string[],
  clearFilters: () => {},
  isLoading: false,
  setIsLoading: (value: boolean | ((val: boolean) => boolean)) => {},
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
//   const toggleFilter = (filter) => {
//     setActiveFilters(prev => 
//       prev.includes(filter)
//         ? prev.filter(f => f !== filter)
//         : [...prev, filter]
//     );
//   };
  
  // Clear all active filters
  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  // The value that will be provided to consumers of this context
  const contextValue = {
    viewMode,
    setViewMode,
    contactFormData,
    setContactFormData,
    activeFilters,
    // toggleFilter,
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
            {/* <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes> */}
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;