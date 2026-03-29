'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import image from '../../assets/myPhoto.jpg';
import resume from '../../assets/Soumodwip_Mondal_Resume.pdf';


export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollToSection } = useScrollToSection();



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Original Skills Data
  const skills: { name: string; color: keyof typeof colorMap }[] = [
    { name: 'Data Analysis', color: 'indigo' },
    { name: 'Business Analysis', color: 'zinc' },
    { name: 'Python', color: 'violet' },
    { name: 'PowerBI', color: 'green' },
    { name: 'SQL', color: 'pink' },
    { name: 'Data Warehousing', color: 'slate' },
    { name: 'ML', color: 'yellow' },
    { name: 'ETL', color: 'red' },
    { name: 'Big Data', color: 'emerald' },
    { name: 'GCP', color: 'fuchsia' },
    { name: 'Excel', color: 'teal' },
    { name: 'JavaScript', color: 'cyan' },
    { name: 'GenAI', color: 'orange' },
    { name: 'React', color: 'stone' },
    { name: 'Notion', color: 'sky' },
  ];

  const colorMap = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    sky: "bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    green: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
    pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-pink-200 dark:border-pink-800",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    red: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    lime: "bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-300 border-lime-200 dark:border-lime-800",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    rose: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    fuchsia: "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800",
    slate: "bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800",
    gray: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800",
    zinc: "bg-zinc-100 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800",
    neutral: "bg-neutral-100 dark:bg-neutral-900/30 text-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800",
    stone: "bg-stone-100 dark:bg-stone-900/30 text-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-800"
  };

  const getColorClasses = (color: keyof typeof colorMap): string => {
    return colorMap[color] || colorMap.blue;
  };

  // Original animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 60, damping: 8 }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 70, delay: 0.6 + (i * 0.1) }
    })
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 80, delay: 1.2 }
    },
    hover: {
      scale: 1.05,
      transition: { type: 'spring' as const, stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="about" className="min-h-[85vh] pt-20 md:pt-28 pb-8 !mb-0 flex items-center relative overflow-hidden bg-background">
      {/* Background accents - subtly matching the Digital Atelier vibe */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[35rem] h-[35rem] bg-[#5dd7e6]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[25rem] h-[25rem] bg-[#005f68]/10 rounded-full blur-[100px] mix-blend-screen"></div>

        {/* Animated Digital Particles */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#5dd7e6] rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-sm font-medium uppercase tracking-widest text-[#5dd7e6] mb-4 leading-relaxed break-words"
                >
                  Data Analyst & Problem Solver
                </motion.h2>

                <motion.h1
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-[1.2] text-white"
                >
                  Turning{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#5dd7e6] via-[#a2f0f9] to-[#8df2ff] bg-clip-text text-transparent font-extrabold pb-1">
                      Complex Data
                    </span>
                  </span>{" "}
                  into Clear, <br /> Actionable Insights
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#bec8ca]/80 mb-8 max-w-xl font-light leading-relaxed"
                >
                  Data Analyst proficient in <span className="text-white font-medium">SQL, Python, Advanced Excel, Machine Learning</span>,
                  and PowerBI. I specialize in converting complex raw data into compelling stories and
                  measurable outcomes to support data-driven strategy and business impact. Problem solver, ranked in the top 9% in LeetCode contests(rating 1769).
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-2 mb-8"
                  variants={itemVariants}
                >
                  {skills.slice(0, 12).map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      custom={index}
                      variants={badgeVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge
                        variant="outline"
                        className={`${getColorClasses(skill.color)} px-3.5 py-1.5 text-[11px] font-semibold border-white/10 glass-card inner-glow shadow-sm`}
                      >
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex flex-wrap gap-4">
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#5dd7e6] to-[#018b99] text-[#002e33] font-bold transition-all duration-300 border-0 shadow-[0_8px_20px_rgba(93,215,230,0.3)] hover:shadow-[0_12px_24px_rgba(93,215,230,0.4)] px-8"
                      onClick={() => scrollToSection('contact')}
                    >
                      Contact Me <ChevronRight className="ml-1 h-5 w-5" />
                    </Button>
                  </motion.div>

                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="border border-[#3f484a] text-[#bec8ca] hover:border-[#5dd7e6]/60 hover:text-[#5dd7e6] hover:bg-[#5dd7e6]/5 transition-all duration-300 bg-transparent"
                    >
                      <a href={resume} target="_blank" rel="noopener noreferrer" className="group px-4 flex items-center">
                        View Resume <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="relative mx-auto max-w-[320px] w-full"
          >
            <motion.div
              className="relative rounded-[2rem] glass-card border border-white/[0.08] shadow-2xl z-10 overflow-hidden aspect-square group"
            >
              {/* Premium Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5dd7e6]/10 to-transparent mix-blend-overlay z-20 pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />

              <img
                src={image}
                alt="Soumodwip Mondal"
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.05] contrast-[1.05] brightness-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Data Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 pointer-events-none opacity-80" />

              {/* High-Contrast Frosted Pill Accent */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-fit px-6 py-3.5 bg-black/40 border border-white/10 rounded-full backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-30 transition-all duration-500 hover:bg-black/50 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(93,215,230,0.15)] cursor-default">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#5dd7e6] shadow-[0_0_12px_#5dd7e6] animate-pulse"></div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#FAFAFA] font-medium whitespace-nowrap">Data Specialist</span>
                </div>
              </div>
            </motion.div>

            {/* Glowing Orbs */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#5dd7e6]/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#005f68]/30 rounded-full blur-[100px] -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
