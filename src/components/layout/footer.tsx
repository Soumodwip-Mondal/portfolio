import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useScrollToSection } from '../../hooks/useScrollToSection';

const socials = [
  { icon: Github, url: 'https://github.com/Soumodwip-Mondal', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/soumodwip-mondal-805243298', label: 'LinkedIn' },
  { icon: Twitter, url: 'https://twitter.com/SouravMond17180', label: 'Twitter' },
  { icon: Mail, url: 'mailto:msoumo005@gmail.com', label: 'Email' },
];

const quickLinks = [
  { label: 'Entrance', section: 'hero' },
  { label: 'Showcase', section: 'projects' },
  { label: 'Universe', section: 'skills-3d' },
  { label: 'Contact', section: 'contact' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const column = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Footer() {
  const { scrollToSection } = useScrollToSection();

  return (
    <footer className="bg-background border-t border-white/5 py-20 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(93,215,230,1) 1px, transparent 1px), linear-gradient(90deg, rgba(93,215,230,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#5dd7e6]/[0.025] to-transparent pointer-events-none" />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Bio */}
          <motion.div variants={column}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-3">Architect</p>
            <h4 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-white to-[#5dd7e6] bg-clip-text text-transparent">
              Soumodwip Mondal
            </h4>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={column}>
            <h3 className="text-[10px] font-bold mb-6 text-zinc-500 uppercase tracking-[0.2em]">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.section}
                  onClick={() => scrollToSection(link.section)}
                  className="text-sm font-light text-zinc-400 hover:text-[#5dd7e6] transition-colors text-left w-fit hover-underline"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Connect */}
          <motion.div variants={column}>
            <h3 className="text-[10px] font-bold mb-6 text-zinc-500 uppercase tracking-[0.2em]">Connect</h3>
            <div className="flex gap-3 flex-wrap">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-[#5dd7e6] hover:border-[#5dd7e6]/30 hover:bg-[#5dd7e6]/5 transition-all duration-300"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <s.icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="mt-6 text-xs text-zinc-700 font-light leading-relaxed">
              Open to full-time & freelance opportunities in data analytics, ML, and web development.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={column}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-zinc-700 font-light flex items-center gap-1.5">
            Built with <span className="text-[#5dd7e6]/60">React · TypeScript · Framer Motion</span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}