import { lazy, Suspense } from 'react';
import Hero from '../components/sections/hero';
import LoadingSpinner from '../components/ui/loading-spinner';

// Lazy load non-critical components
const Projects = lazy(() => import('../components/sections/projects'));
const Skills3D = lazy(() => import('../components/sections/skills-3d'));
const Contact = lazy(() => import('../components/sections/contact'));
const Footer = lazy(() => import('../components/layout/footer'));

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      {/* Premium Atmospheric Depth Elements */}
      <div className="depth-blob top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#5dd7e6]/[0.05] blur-[150px] animate-pulse" />
      <div className="depth-blob top-[30%] right-[-5%] w-[500px] h-[500px] bg-[#5dd7e6]/[0.03] blur-[120px]" style={{ animationDelay: '2s' }} />
      <div className="depth-blob bottom-[10%] left-[5%] w-[700px] h-[700px] bg-zinc-500/[0.02] blur-[180px] animate-pulse" style={{ animationDuration: '10s' }} />
      <main className="container mx-auto px-4">
        <Hero />

        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Skills3D />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
}