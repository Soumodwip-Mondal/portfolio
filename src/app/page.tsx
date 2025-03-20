import Hero from '../components/sections/hero';
import Projects from '../components/sections/projects';
import Skills from '../components/sections/skills';
import Skills3D from '../components/sections/skills-3d';
import Contact from '../components/sections/contact';
import Footer from '../components/layout/footer';
import InteractivePlayground from '../components/sections/interactive-playground';
import Dashboard from '../components/sections/dashboard';
import AugmentedReality from '../components/sections/augmented-reality';
import AIAssistantPromo from '../components/sections/ai-assistant-promo';
import VoiceControlPromo from '../components/sections/voice-control-promo';
import { PersonalizedRecommendations } from '../components/personalization/PersonalizedRecommendations';
import { SectionTracker } from '../components/personalization/SectionTracker';
import { usePersonalization } from '../context/PersonalizationContext';
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
          <Projects />
        </SectionTracker>
        
        <SectionTracker sectionId="interactive-playground" interest="development">
          <InteractivePlayground />
        </SectionTracker>
        
        <SectionTracker sectionId="skills-3d" interest="development">
          <Skills3D />
        </SectionTracker>
        
        <SectionTracker sectionId="ai-assistant" interest="ai">
          <AIAssistantPromo />
        </SectionTracker>
        
        <SectionTracker sectionId="voice-control" interest="ai">
          <VoiceControlPromo />
        </SectionTracker>
        
        <SectionTracker sectionId="dashboard" interest="data">
          <Dashboard />
        </SectionTracker>
        
        <SectionTracker sectionId="augmented-reality" interest="mobile">
          <AugmentedReality />
        </SectionTracker>
        
        <SectionTracker sectionId="skills" interest="development">
          <Skills />
        </SectionTracker>
        
        <SectionTracker sectionId="contact">
          <Contact />
        </SectionTracker>
      </main>
      <Footer />
      
      {/* Hire Me Popup that appears after 10 seconds for testing */}
      <HireMePopup timeToShow={10000} />
    </>
  );
}