import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/header';
import Home from './app/page';
import BlogPage from './pages/BlogPage';
import Dashboard from './components/sections/dashboard';
import CollaborativePage from './pages/CollaborativePage';
import { ScrollToTop as ScrollToTopButton } from './components/ui/scroll-indicators';

// Scroll to top on route change (unless there's a hash)
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative">
        <div className="noise-bg pointer-events-none fixed inset-0 z-[100] mix-blend-overlay opacity-50"></div>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/collaborate" element={<CollaborativePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;