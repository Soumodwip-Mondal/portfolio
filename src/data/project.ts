import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description: "Description for project 1",
    category: "Web Development",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "/images/project1.jpg",
    imageUrl: "/images/project1.jpg",
    url: 'https://example.com/project1',
    featured: true,
    date: "June 2023"
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description for project 2",
    category: "Mobile App",
    tags: ["React Native", "Firebase"],
    image: "/images/project2.jpg",
    imageUrl: "/images/project2.jpg",
    url: 'https://example.com/project2',
    date: "March 2023"
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description for project 3",
    category: "UI/UX Design",
    tags: ["Figma", "Adobe XD"],
    image: "/images/project3.jpg",
    imageUrl: "/images/project3.jpg",
    url: 'https://example.com/project3',
    date: "January 2023"
  }
]

export default projects;