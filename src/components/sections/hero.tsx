'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import image from '../../assets/myPhoto.jpg';
import resume from '../../assets/Soumodwip_Mondal_Resume.pdf';

const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 13h7.5" />
    <path d="M9.424 7.268l4.999 -4.999" />
    <path d="M16.633 16.644l-2.402 2.415a3.189 3.189 0 0 1 -4.524 0l-3.765 -3.77a3.189 3.189 0 0 1 0 -4.517l1.11 -1.115" />
  </svg>
);

function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${className ?? ''}`}
          initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {word}{i < words.length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </>
  );
}

const skills = [
  'Data Analysis', 'Business Analysis', 'Python', 'PowerBI', 'SQL',
  'Data Warehousing', 'ML', 'ETL', 'Big Data', 'GCP', 'Excel',
  'JavaScript', 'GenAI', 'React', 'Notion', 'Tableau', 'Pandas'
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollToSection } = useScrollToSection();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 180 });
  const rotateX = useTransform(springY, [-130, 130], [10, -10]);
  const rotateY = useTransform(springX, [-130, 130], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      width: (i % 3) + 1, height: (i % 3) + 1,
      left: `${(i * 17 + 5) % 100}%`, top: `${(i * 13 + 10) % 100}%`,
      duration: 5 + (i % 5), delay: (i * 0.4) % 5,
    })), []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const btnVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: (i: number) => ({
      scale: 1, opacity: 1,
      transition: { type: 'spring' as const, stiffness: 80, delay: 1.2 + i * 0.1 }
    }),
    hover: { scale: 1.05, transition: { type: 'spring' as const, stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 },
  };

  return (
    <section id="about" className="min-h-[90vh] pt-20 md:pt-28 pb-12 !mb-0 flex items-center relative overflow-x-hidden bg-background">
      {/* Ambient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[35rem] h-[35rem] bg-[#5dd7e6]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[25rem] h-[25rem] bg-[#005f68]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {particles.map((p, i) => (
            <motion.div key={i} className="absolute bg-[#5dd7e6] rounded-full"
              style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
              animate={{ y: [0, -100], opacity: [0, 1, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        {/*
          Layout strategy:
          - Mobile (flex-col): Text FIRST in DOM → shows on top. Photo LAST → shows below buttons.
          - Desktop (md:grid 2-col): Text is col-1 (left), Photo is col-2 (right). DOM order matches visual order naturally.
        */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 md:items-center">

          {/* ── Text — first in DOM ── */}
          <AnimatePresence>
            {isLoaded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">

                <motion.p className="text-sm md:text-base font-semibold uppercase tracking-widest text-[#5dd7e6] mb-3"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                >
                  Data Analyst &amp; Problem Solver
                </motion.p>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight leading-[1.3] text-white break-words max-w-full">
                  <WordReveal text="Turning" delay={0.3} />{' '}
                  <WordReveal
                    text="Complex Data"
                    delay={0.42}
                    className="bg-gradient-to-r from-[#5dd7e6] via-[#a2f0f9] to-[#8df2ff] bg-clip-text text-transparent animate-gradient-x"
                  />{' '}
                  <WordReveal text="into Clear, Actionable Insights" delay={0.62} />
                </h1>

                <motion.p
                  className="text-sm md:text-base text-[#bec8ca]/80 mb-7 max-w-xl font-light leading-relaxed"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.6 }}
                >
                  Data Analyst proficient in{' '}
                  <span className="text-white font-medium">SQL, Python, Data Warehousing, Big Data, Advanced Excel, Machine Learning</span>
                  {' '}and PowerBI. Turning complex raw data into compelling stories and measurable outcomes.{' '}
                  Ranked <span className="text-white font-medium">top 9%</span> on LeetCode (Rating 1769).
                </motion.p>

                <motion.div className="marquee-wrap mb-7"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                  <div className="marquee-track gap-2">
                    {[...skills, ...skills].map((skill, i) => (
                      <Badge key={i} variant="outline"
                        className="px-3 py-1 text-[10px] font-semibold bg-white/5 text-zinc-400 border-white/10 backdrop-blur-md hover:bg-[#5dd7e6]/10 hover:text-[#5dd7e6] hover:border-[#5dd7e6]/40 transition-all duration-300 whitespace-nowrap flex-shrink-0 mr-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                {/*
                  Buttons:
                  - Desktop: all 3 in one row (flex-wrap keeps them together)
                  - Mobile: flex-wrap means they sit side by side and wrap if needed
                */}
                <div className="flex flex-wrap gap-3">
                  <motion.div custom={0} variants={btnVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
                    <Button size="default" onClick={() => scrollToSection('contact')}
                      className="bg-gradient-to-r from-[#5dd7e6] to-[#018b99] text-[#002e33] font-bold border-0 shadow-[0_8px_20px_rgba(93,215,230,0.3)] hover:shadow-[0_12px_28px_rgba(93,215,230,0.45)] px-6 transition-shadow duration-300"
                    >
                      Contact Me <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>

                  <motion.div custom={1} variants={btnVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
                    <Button variant="outline" size="default" asChild
                      className="border border-[#3f484a] text-[#bec8ca] hover:border-[#5dd7e6]/60 hover:text-[#5dd7e6] hover:bg-[#5dd7e6]/5 transition-all duration-300 bg-transparent">
                      <a href={resume} target="_blank" rel="noopener noreferrer" className="px-5 flex items-center">
                        Resume <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div custom={2} variants={btnVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
                    <Button variant="outline" size="default" asChild
                      className="border border-[#3f484a] text-[#bec8ca] hover:border-[#5dd7e6]/60 hover:text-[#5dd7e6] hover:bg-[#5dd7e6]/5 transition-all duration-300 bg-transparent">
                      <a href="https://leetcode.com/u/Soumodwip/" target="_blank" rel="noopener noreferrer" className="px-5 flex items-center">
                        LeetCode <LeetCodeIcon className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Photo — last in DOM (right col on desktop, below all content on mobile) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.25 }}
            className="relative mx-auto"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px', width: 'min(280px, 80vw)' }}
          >
            <motion.div
              className="relative rounded-[2rem] border border-[#5dd7e6]/30 shadow-[0_0_40px_rgba(93,215,230,0.12)] overflow-hidden group"
              style={{
                rotateX, rotateY, transformStyle: 'preserve-3d',
                width: '100%',
                height: 'min(280px, 80vw)',
                background: '#0a0a0a',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5dd7e6]/10 to-transparent mix-blend-overlay z-20 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={image}
                alt="Soumodwip Mondal"
                className="absolute inset-0 w-full h-full object-cover object-top brightness-110 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
            </motion.div>

            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#5dd7e6]/20 rounded-full blur-[60px] -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#005f68]/30 rounded-full blur-[80px] -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
