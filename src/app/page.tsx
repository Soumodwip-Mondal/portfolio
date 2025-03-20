import { lazy, Suspense } from 'react';
import Hero from '../components/sections/hero';

// Lazy load non-critical components
const Projects = lazy(() => import('../components/sections/projects'));
const Skills = lazy(() => import('../components/sections/skills'));
const Skills3D = lazy(() => import('../components/sections/skills-3d'));
const Contact = lazy(() => import('../components/sections/contact'));
const Footer = lazy(() => import('../components/layout/footer'));
const InteractivePlayground = lazy(() => import('../components/sections/interactive-playground'));
const AugmentedReality = lazy(() => import('../components/sections/augmented-reality'));

import { PersonalizedRecommendations } from '../components/personalization/PersonalizedRecommendations';
import { SectionTracker } from '../components/personalization/SectionTracker';
import { usePersonalization } from '../context/PersonalizationContext';
import { LoadingSpinner } from '../components/ui/loading-spinner';
import HireMePopup from '../components/shared/hire-me-popup';

export default function Home() {
  const { isReturningVisitor } = usePersonalization();
  return (
    <>
      <main className="container mx-auto px-4">
      <SectionTracker sectionId="hero" interest="development">
          <Hero />
        </SectionTracker>
        
        {/* Show personalized recommendations for returning visitors */}
        {isReturningVisitor && (
          <PersonalizedRecommendations />
        )}
        
        <SectionTracker sectionId="projects" interest="development">
          <Suspense fallback={<LoadingSpinner />}>
            <Projects />
          </Suspense>
        </SectionTracker>
        
        <SectionTracker sectionId="interactive-playground" interest="development">
          <Suspense fallback={<LoadingSpinner />}>
            <InteractivePlayground />
          </Suspense>
        </SectionTracker>
        
        <SectionTracker sectionId="skills-3d" interest="development">
          <Suspense fallback={<LoadingSpinner />}>
            <Skills3D />
          </Suspense>
        </SectionTracker>
        
      
        
        <SectionTracker sectionId="augmented-reality" interest="mobile">
          <Suspense fallback={<LoadingSpinner />}>
            <AugmentedReality />
          </Suspense>
        </SectionTracker>
        
        <SectionTracker sectionId="skills" interest="development">
          <Suspense fallback={<LoadingSpinner />}>
            <Skills />
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
      
      {/* Hire Me Popup that appears after 10 seconds for testing */}
      <HireMePopup timeToShow={10000} />
    </>
  );
}