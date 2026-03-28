import { lazy, Suspense } from 'react';
import Hero from '../components/sections/hero';

// Lazy load non-critical components
const Projects = lazy(() => import('../components/sections/projects'));
const Skills3D = lazy(() => import('../components/sections/skills-3d'));
const Contact = lazy(() => import('../components/sections/contact'));
const Footer = lazy(() => import('../components/layout/footer'));
import { SectionTracker } from '../components/personalization/SectionTracker';
import LoadingSpinner from '../components/ui/loading-spinner';

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      {/* Background blobs for depth and glassmorphism */}
      <div className="depth-blob top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 animate-pulse" />
      <div className="depth-blob top-[30%] right-[-5%] w-[400px] h-[400px] bg-purple-500/10" style={{ animationDelay: '2s' }} />
      <div className="depth-blob bottom-[10%] left-[5%] w-[600px] h-[600px] bg-blue-500/10 animate-pulse" style={{ animationDuration: '8s' }} />
      <main className="container mx-auto px-4">
      <SectionTracker sectionId="hero" interest="development">
          <Hero />
        </SectionTracker>
        
        
        <SectionTracker sectionId="projects" interest="development">
          <Suspense fallback={<LoadingSpinner />}>
            <Projects />
          </Suspense>
        </SectionTracker>
        
        <SectionTracker sectionId="skills-3d" interest="development">
          <Suspense fallback={<LoadingSpinner />}>
            <Skills3D />
          </Suspense>
        </SectionTracker>
        <SectionTracker sectionId="contact">
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        </SectionTracker>
      </main>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
      
    </div>
  );
}