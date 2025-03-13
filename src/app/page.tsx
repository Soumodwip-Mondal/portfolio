import Hero from '../components/sections/hero';
import Projects from '../components/sections/projects';
import Skills from '../components/sections/skills';
import Skills3D from '../components/sections/skills-3d';
import Contact from '../components/sections/contact';
import Footer from '../components/layout/footer';

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4">
        <Hero />
        <Projects />
        <Skills3D />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}