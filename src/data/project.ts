import { Project } from '../types/project';
import speech_reco from "../assets/speech_reco.png";
import data_analysis from "../assets/data-analisis.png";
export const projects: Project[] = [
  {
    id: 1,
    title: "Speech Recognition",
    description: "Can you believe that you can control your computer by just speaking? Yes, it's possible with the help of AI. I have created a simple speech recognition project using Python and Gemeni-api.",
    category: "Web Development",
    tags: ["Python", "Gemeni-api", "Speech Recognition"],
    image: speech_reco,
    imageUrl: speech_reco,
    url: 'https://example.com/project1',
    featured: true,
    date: "March 2025"
  },
  {
    id: 2,
    title: "Marketing-Analytics-Exploratory-Statistical-Analysis",
    description: "I have done a statistical analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    category: "Data Analysis",
    tags: ["Python", "Pandas", "Matplotlib"],
    image: data_analysis,
    imageUrl: data_analysis,
    url: 'https://example.com/project2',
    date: "2025"
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
    date: "2025"
  }
]

export default projects;