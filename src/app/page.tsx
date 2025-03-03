import Hero from '../components/sections/hero';
import Projects from '../components/sections/projects';
// import Skills from '@/components/sections/skills';
// import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
       {/* <Header /> */}
      <main className="container mx-auto px-4">
        <Hero />
        <Projects />
        {/* <Skills />
        <Contact /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}