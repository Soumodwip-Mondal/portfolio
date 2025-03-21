import { Project } from '../types/project';
import speech_reco from "../assets/speech_reco.png";
import data_analysis from "../assets/data-analisis.png";
export const projects: Project[] = [
  
  {
    id: 1,
    title: "My Portfolio",
    description: "This my best Project I put all my ideas and creativity in this project. This is a mixture of all the technologies I have learned so far. It has multiple features like AI Assistant, 3D Animation, Voice Controll Navigation, Collaborate Drawing, Blogs.",
    category: "web",
    tags: ["TypeScript", "React", "Tailwind CSS", "Freamer Motion","Three JS","lucide-react","Speech Recognition"],
    image: "/images/project3.jpg",
    imageUrl: "/images/project3.jpg",
    url: 'https://soumodwipmondal.vercel.app/',
    date: "2025"
  },

  {
    id: 2,
    title: "Marketing-Analytics-Exploratory-Statistical-Analysis",
    description: "I have done a statistical analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    category: "data",
    tags: ["Python", "Pandas", "Matplotlib"],
    image: data_analysis,
    imageUrl: data_analysis,
    url: 'https://github.com/Soumodwip-Mondal/Marketing-Analytics-Exploratory-Statistical-Analysis-task.git',
    date: "2025"
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description for project 3",
    category: "python",
    tags: ["Figma", "Adobe XD"],
    image: "/images/project3.jpg",
    imageUrl: "/images/project3.jpg",
    url: 'https://github.com/Soumodwip-Mondal/Python-Projects.git',
    date: "2025"
  },
  {
    id: 4,
    title: "Express Your Love",
    description: "Express your love to your loved ones with this simple web app. I have created this project using React and Basic CSS.",
    category: "web",
    tags: ["React", "CSS",'JavaScript'],
    image: "/images/project3.jpg",
    imageUrl: "/images/project3.jpg",
    url: 'https://web-gotlove.vercel.app/',
    date: "2025"
  },
  {
    id: 5,
    title: "Speech Recognition",
    description: "Can you believe that you can control your computer by just speaking? Yes, it's possible with the help of AI. I have created a simple speech recognition project using Python and Gemeni-api.",
    category: "python",
    tags: ["Python", "Gemeni-api", "Speech Recognition"],
    image: speech_reco,
    imageUrl: speech_reco,
    url: 'https://github.com/Soumodwip-Mondal/Speech-recognizer.git',
    featured: true,
    date: "March 2025"
  }
  ,
  {
    id: 6,
    title: "Devvit Game",
    description: "",
    category: "web",
    tags: ["TypeScript", "React", "Tailwind CSS", "Devvit"],
    image: "/images/project3.jpg",
    imageUrl: "/images/project3.jpg",
    url: 'https://github.com/Soumodwip-Mondal/Python-Projects.git',
    date: "2025"
  },
  {
    id: 7,
    title: "Basic ML Project",
    description: "I have created a basic machine learning project using Python and Scikit-learn. I have used the Iris dataset to train the model.",
    category: "ml",
    tags: ["Figma", "Adobe XD"],
    image: "/images/project3.jpg",
    imageUrl: "/images/project3.jpg",
    url: 'https://github.com/Soumodwip-Mondal/portfolio.git',
    date: "2025"
  },
  {
    id: 8,
    title: "ML Project",
    description: "I have created a basic machine learning project using Python and Scikit-learn. I have used the Iris dataset to train the model.",
    category: "ml",
    tags: ["Figma", "Adobe XD"],
    image: "/images/project3.jpg",
    imageUrl: "/images/project3.jpg",
    url: 'https://github.com/Soumodwip-Mondal/Python-Projects.git',
    date: "2025"
  },
  {
    id: 9,
    title: "Making Predictions Using data",
    description: "I have done a statistical analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    category: "data",
    tags: ["Python", "Pandas", "Matplotlib"],
    image: data_analysis,
    imageUrl: data_analysis,
    url: 'https://github.com/Soumodwip-Mondal/Marketing-Analytics-Exploratory-Statistical-Analysis-task.git',
    date: "2025"
  },
  {
    id: 9,
    title: "Jeevan Vase",
    description: "Website for a NGO and Individual.",
    category: "group",
    tags: ["Python", "Pandas", "Matplotlib"],
    image: data_analysis,
    imageUrl: data_analysis,
    url: 'https://github.com/Soumodwip-Mondal/Marketing-Analytics-Exploratory-Statistical-Analysis-task.git',
    date: "2025"
  },
  {
    id: 10,
    title: "Making Predictions Using data",
    description: "I have done a statistical analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    category: "analytics",
    tags: ["Python", "Pandas", "Matplotlib"],
    image: data_analysis,
    imageUrl: data_analysis,
    url: 'https://github.com/Soumodwip-Mondal/Marketing-Analytics-Exploratory-Statistical-Analysis-task.git',
    date: "2025"
  },
]

export default projects;