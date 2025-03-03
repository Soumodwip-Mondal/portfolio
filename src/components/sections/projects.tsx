'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import ProjectCard from '../shared/project-card';
import { projects } from '../../data/project';
import AnimatedContainer from '../shared/animated-container';

export default function Projects() {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section 
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInVariants}
      className="py-16"
    >
      <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Some of my recent work</p>
      
      <AnimatedContainer variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </AnimatedContainer>
      
      <div className="flex justify-center mt-10">
        <Button variant="outline">View All Projects</Button>
      </div>
    </motion.section>
  );
}