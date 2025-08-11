import { Project } from '../types/project';
import speech_reco from "../assets/speech_reco.png";
import data_analysis from "../assets/data-analisis.png";
import pizza_data from '../assets/Pizza_data.png';
import myPortfolio from '../assets/myportfolio.png'
import data_warehouse from '../assets/Data_Warehouse.png'
import final_cluster from '../assets/final_clusters.png'
import spotify_logo from '../assets/spotify_logo.png'
import love from '../assets/love.png'
import feed_back from '../assets/feed_back.png'
import visulization from '../assets/Visualization.png'
import jeevan from '../assets/jeevan.png'
import mall_customer from '../assets/mall_customer.png'
import ml from '../assets/ml1.png'
export const projects: Project[] = [
  
  {
    id: 1,
    title: "My Portfolio",
    description: "This my best Project I put all my ideas and creativity in this project. This is a mixture of all the technologies I have learned so far. It has multiple features like AI Assistant, 3D Animation, Voice Controll Navigation, Collaborate Drawing, Blogs.",
    category: "web",
    tags: ["TypeScript", "React", "Tailwind CSS", "Freamer Motion","Three JS","lucide-react","Speech Recognition"],
    image: myPortfolio,
    imageUrl: myPortfolio,
    url: 'https://soumodwipmondal.vercel.app/',
    date: "2025"
  },

  {
    id: 2,
    title: "ShopEasy Marketing Strategy and Customer Feedback Analysis",
    description: "This project analyzes key performance metrics, customer feedback, and marketing content to uncover issues and deliver actionable, data-driven recommendations for improving overall performance.",
    category: "data analysis",
    tags: ["Python","SQL", "Power BI", "NLTK","Sentiment Analysis","marketting analysis"],
    image: feed_back,
    imageUrl: feed_back,
    url: 'https://github.com/Soumodwip-Mondal/Marketing-Data-Analysis2',
    date: "11/05/2025"
  },
    {
    id: 3,
    title: "Credit Card Customer Segmentation and Behavior Analysis",
    description: " Segment credit card customers based on spending patterns and repayment behavior to help businesses design targeted offers, improve retention, and detect risky customers.",
    category: "customer segmentation",
    tags: ["Python", "Pandas", "Matplotlib","Sicit Learn", "Kmean", "Seaborn", "Clustering","PCA","Dimensionality Reduction","Data Visualization"],
    image: final_cluster,
    imageUrl: final_cluster,
    url: 'https://github.com/Soumodwip-Mondal/Credit-Card-Customer-Segmentaion',
    date: "11/08/2025"
  },
  {
    id: 4,
    title: "Building an Enterprise-Lebel Data Warehouse",
    description: "This project involves designing and implementing a data warehouse for an enterprise, focusing on data integration, storage, and retrieval to support business intelligence and analytics.",
    category: "database",
    tags: ["PostgreSQL", "Data Integration", "Data Warehousing", "ETL","Data analysis"],
    image: data_warehouse,
    imageUrl: data_warehouse,
    url: 'https://github.com/Soumodwip-Mondal/SQL-Data-Warehouse-and-Analysics-Project',
    featured: true,
    date: "August 2025"
  },
  {
    id:5,
    title: "Mall Customer Segmentation and Behavior Analysis",
    description: " Segment credit card customers based on spending patterns and repayment behavior to help businesses design targeted offers, improve retention, and detect risky customers.",
    category: "customer segmentation",
    tags: ["Python", "Pandas", "Matplotlib", "Sicit Learn", "Kmean", "Seaborn"],
    image: mall_customer,
    imageUrl: mall_customer,
    url: 'https://github.com/Soumodwip-Mondal/Credit-Card-Customer-Segmentaion',
    date: "11/08/2025"
  },
        {
    id: 7,
    title: "Blinkit Sales Data Analysis",
    description: "This interactive Power BI dashboard is built to analyze retail sales performance across multiple dimensions like item types, fat content, outlet characteristics, and geographic locations. It provides actionable insights for decision-makers to evaluate key metrics such as total sales, average sales, number of items sold, and average customer ratings..",
    category: "data analysis",
    tags: ["PowerBI", "Data Analysis", "Data Visualization"],
    image: visulization,
    imageUrl: visulization,
    url: 'https://github.com/Soumodwip-Mondal/Blinkit_data_visulization_and_analysis/',
    date: "June,2025"
  },
      {
    id: 8,
    title: "Spotify Streaming Data Analysis",
    description: ". It covers an end-to-end process of normalizing a denormalized dataset, performing SQL queries of varying complexity (easy, medium, and medium to hard), and optimizing query performance.",
    category: "database",
    tags: ["PostgreSQL", "Data Analysis", "Query Optimization", "Data Visualization"],
    image: spotify_logo,
    imageUrl: spotify_logo,
    url: 'https://github.com/Soumodwip-Mondal/spotify_data_analysis_using_postgresSQL',
    date: "June,2025"
  },
    {
    id: 9,
    title: "Pizza Sales Data Analysis",
    description: "I have done a analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    category: "data analysis",
    tags: ["Python", "Pandas", "Matplotlib"],
    image: pizza_data,
    imageUrl: pizza_data,
    url: 'https://github.com/Soumodwip-Mondal/PizzaSales_Data_analysis.git',
    date: "2025"
  },
  {
    id: 10,
    title: "Express Your Love",
    description: "Express your love to your loved ones with this simple web app. I have created this project using React and Basic CSS.",
    category: "web",
    tags: ["React", "CSS",'JavaScript'],
    image: love,
    imageUrl: love,
    url: 'https://web-gotlove.vercel.app/',
    date: "2025"
  },
  {
    id: 11,
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
    id: 12,
    title: "ML Project",
    description: "This is ongoing project",
    category: "ml",
    tags: ["Figma", "Adobe XD"],
    image: ml,
    imageUrl: ml,
    url: 'https://github.com/Soumodwip-Mondal/Python-Projects.git',
    date: "2025"
  },
  {
    id: 13,
    title: "Making Predictions Using data",
    description: "I have done a statistical analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    category: "trend analysis",
    tags: ["Python", "Pandas", "Matplotlib"],
    image: data_analysis,
    imageUrl: data_analysis,
    url: 'https://github.com/Soumodwip-Mondal/Marketing-Analytics-Exploratory-Statistical-Analysis-task.git',
    date: "2025"
  },
  {
    id: 14,
    title: "Jeevan Vase",
    description: "Website for a NGO and Individual.",
    category: "group",
    tags: ["TypeScript", "React.js", "Shacn","Socket io","Tailwind CSS","Node.js"],
    image: jeevan,
    imageUrl: jeevan,
    url: 'https://github.com/Soumodwip-Mondal/Jeevan-verse2.git',
    date: "2025"
  }

]

export default projects;