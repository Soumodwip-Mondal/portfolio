import { Project } from '../types/project';

export const projects: Project[] = [
  { 
    id: 1, 
    title: 'E-commerce Platform', 
    description: 'A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    image: '/images/projects/project1.jpg',
    url: 'https://example.com/project1'
  },
  { 
    id: 2, 
    title: 'AI Content Generator', 
    description: 'An AI-powered content creation tool using OpenAI API with a sleek UI.',
    tags: ['React', 'OpenAI', 'TypeScript', 'shadcn/ui'],
    image: '/images/projects/project2.jpg',
    url: 'https://example.com/project2'
  },
  { 
    id: 3, 
    title: 'Finance Dashboard', 
    description: 'Interactive dashboard visualizing financial data with real-time updates.',
    tags: ['Next.js', 'D3.js', 'TypeScript', 'Supabase'],
    image: '/images/projects/project3.jpg',
    url: 'https://example.com/project3'
  }
];