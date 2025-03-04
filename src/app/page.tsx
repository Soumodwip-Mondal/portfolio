import Hero from '../components/sections/hero';
import Projects from '../components/sections/projects';
import Skills from '../components/sections/skills';
import Contact from '../components/sections/contact';
import Footer from '../components/layout/footer';
export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}