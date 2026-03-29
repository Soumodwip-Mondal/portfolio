import { Project } from '../types/project';
import speech_reco from "../assets/speech_reco.png";
import data_analysis from "../assets/data-analisis.png";
import pizza_data from '../assets/Pizza_data.png';
import myPortfolio from '../assets/myportfolio.png'
import data_warehouse from '../assets/Data_Warehouse.png'
import final_cluster from '../assets/final_clusters.png'
import spotify_logo from '../assets/spotify_logo.png'
import feed_back from '../assets/feed_back.png'
import visulization from '../assets/Visualization.png'
import jeevan from '../assets/jeevan.png'
import mall_customer from '../assets/mall_customer.png'
import analytica from '../assets/analytica.png'
import cine_pulse from '../assets/cine_pulse.png'
import ecom_dash from '../assets/ecom_dash.png'
import olympic from '../assets/olympic.png'
import emp_data_model from '../assets/emp_data_model.png'
import credit_card from '../assets/credit_card.png'
export const projects: Project[] = [

  {
    id: 1,
    title: "Analytica",
    description: "This is a GenAI based data analysis and visualization platform. Here you can upload your data and get insights and visualizations in seconds.",
    categories: ["ML&GenAI", "Web"],
    tags: ["React", "Tailwind CSS", "Gemini API", "FastAPI", "Python", "Data Analysis", "Data Visualization"],
    image: analytica,
    imageUrl: analytica,
    url: 'https://github.com/Soumodwip-Mondal/Analytica',
    date: "2026"
  },
  {
    id: 2,
    title: "CinePulse",
    description: "This is a movie recommendation system. Here you can get recommendations based on your preferences.",
    categories: ["ML&GenAI", "Web"],
    tags: ["ML", "React", "Tailwind CSS", "Gemini API", "FastAPI", "TMDB API"],
    image: cine_pulse,
    imageUrl: cine_pulse,
    url: 'https://movie-recommendation-system-brown.vercel.app/',
    date: "2026"
  },
  {
    id: 3,
    title: "Credit Card Risk Analysis and Prediction",
    description: "This is a credit card risk analysis and prediction system. Here you can get the risk analysis and prediction based on the credit card data.",
    categories: ["ML&GenAI", "data analysis", "Web"],
    tags: ["Python", "FastAPI", "Scikit-learn", "XGBoost", "Data Analysis", "ML", "React"],
    image: credit_card,
    imageUrl: credit_card,
    url: 'https://github.com/Soumodwip-Mondal/Credit-Risk-Prediction-Software',
    date: "2026"
  },
  {
    id: 4,
    title: "Credit Card Customer Segmentation and Behavior Analysis",
    description: " Segment credit card customers based on spending patterns and repayment behavior to help businesses design targeted offers, improve retention, and detect risky customers.",
    categories: ["ML&GenAI", "data analysis"],
    tags: ["Python", "Pandas", "Matplotlib", "Sicit Learn", "Kmean", "Seaborn", "Clustering", "PCA", "Dimensionality Reduction", "Data Visualization"],
    image: final_cluster,
    imageUrl: final_cluster,
    url: 'https://github.com/Soumodwip-Mondal/Credit-Card-Customer-Segmentaion',
    date: "11/08/2025"
  },
  {
    id: 5,
    title: "ShopEasy Marketing Campaign Analysis",
    description: "This project involves analyzing the marketing campaign data of ShopEasy to extract meaningful insights and trends.",
    categories: ["ML&GenAI", "data analysis"],
    tags: ["Python", "PowerBI", "Data Analysis", "NLTK", "Sentiment Analysis"],
    image: feed_back,
    imageUrl: feed_back,
    url: 'https://github.com/Soumodwip-Mondal/Credit-Card-Customer-Segmentaion',
    date: "11/08/2025"
  },
  {
    id: 6,
    title: "Building an Enterprise-Lebel Data Warehouse",
    description: "This project involves designing and implementing a data warehouse for an enterprise, focusing on data integration, storage, and retrieval to support business intelligence and analytics.",
    categories: ["database"],
    tags: ["PostgreSQL", "Data Integration", "Data Warehousing", "ETL", "Data analysis"],
    image: data_warehouse,
    imageUrl: data_warehouse,
    url: 'https://github.com/Soumodwip-Mondal/SQL-Data-Warehouse-and-Analysics-Project',
    featured: true,
    date: "August 2025"
  },
  {
    id: 7,
    title: "Mall Customer Segmentation and Behavior Analysis",
    description: " Segment credit card customers based on spending patterns and repayment behavior to help businesses design targeted offers, improve retention, and detect risky customers.",
    categories: ["ML&GenAI"],
    tags: ["Python", "Pandas", "Matplotlib", "Sicit Learn", "Kmean", "Seaborn"],
    image: mall_customer,
    imageUrl: mall_customer,
    url: 'https://github.com/Soumodwip-Mondal/Credit-Card-Customer-Segmentaion',
    date: "11/08/2025"
  },
  {
    id: 8,
    title: "E-Commerce Sales Data Analysis and Dashboard Building",
    description: "This project involves designing and implementing a data warehouse for an enterprise, focusing on data integration, storage, and retrieval to support business intelligence and analytics.",
    categories: ["data analysis"],
    tags: ["Excel", "Data Analysis", "Data Visualization"],
    image: ecom_dash,
    imageUrl: ecom_dash,
    url: 'https://github.com/Soumodwip-Mondal/Ecommerce-Data-Analysis-And-Dashboard-Building',
    date: "11/05/2025"
  },
  {
    id: 9,
    title: "Blinkit Sales Data Analysis",
    description: "This interactive Power BI dashboard is built to analyze retail sales performance across multiple dimensions like item types, fat content, outlet characteristics, and geographic locations. It provides actionable insights for decision-makers to evaluate key metrics such as total sales, average sales, number of items sold, and average customer ratings..",
    categories: ["data analysis"],
    tags: ["PowerBI", "Data Analysis", "Data Visualization"],
    image: visulization,
    imageUrl: visulization,
    url: 'https://github.com/Soumodwip-Mondal/Blinkit_data_visulization_and_analysis/',
    date: "June,2025"
  },
  {
    id: 10,
    title: "HR Data Model",
    description: "This project involves designing and implementing a data model for an enterprise, focusing on data integration, storage, and retrieval to support business intelligence and analytics.",
    categories: ["database"],
    tags: ["Data Modeling", "Database Design", "SQL", "Data Analysis"],
    image: emp_data_model,
    imageUrl: emp_data_model,
    url: 'https://github.com/Soumodwip-Mondal/enterprise-hr-data-model',
    date: "June,2025"
  },
  {
    id: 11,
    title: "Spotify Streaming Data Analysis",
    description: ". It covers an end-to-end process of normalizing a denormalized dataset, performing SQL queries of varying complexity (easy, medium, and medium to hard), and optimizing query performance.",
    categories: ["database", "data analysis"],
    tags: ["PostgreSQL", "Data Analysis", "Query Optimization", "Data Visualization"],
    image: spotify_logo,
    imageUrl: spotify_logo,
    url: 'https://github.com/Soumodwip-Mondal/spotify_data_analysis_using_postgresSQL',
    date: "June,2025"
  },
  {
    id: 12,
    title: "Olympic Data Analysis",
    description: "This project involves analyzing the Olympic dataset to extract meaningful insights and trends.",
    categories: ["data analysis"],
    tags: ["Streamlit", "Data Analysis", "Data Visualization"],
    image: olympic,
    imageUrl: olympic,
    url: 'https://github.com/Soumodwip-Mondal/enterprise-hr-data-model',
    date: "June,2025"
  },
  {
    id: 13,
    title: "Pizza Sales Data Analysis",
    description: "I have done a analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    categories: ["data analysis"],
    tags: ["Python", "Pandas", "Matplotlib"],
    image: pizza_data,
    imageUrl: pizza_data,
    url: 'https://github.com/Soumodwip-Mondal/PizzaSales_Data_analysis.git',
    date: "2025"
  },
  {
    id: 14,
    title: "Speech Recognition",
    description: "Can you believe that you can control your computer by just speaking? Yes, it's possible with the help of AI. I have created a simple speech recognition project using Python and Gemeni-api.",
    categories: ["python"],
    tags: ["Python", "Gemeni-api", "Speech Recognition"],
    image: speech_reco,
    imageUrl: speech_reco,
    url: 'https://github.com/Soumodwip-Mondal/Speech-recognizer.git',
    featured: true,
    date: "March 2025"
  }
  ,
  {
    id: 15,
    title: "My Portfolio",
    description: "This my best Project I put all my ideas and creativity in this project. This is a mixture of all the technologies I have learned so far. It has multiple features like AI Assistant, 3D Animation, Voice Controll Navigation, Collaborate Drawing, Blogs.",
    categories: ["web"],
    tags: ["TypeScript", "React", "Tailwind CSS", "Freamer Motion", "Three JS", "lucide-react", "Speech Recognition"],
    image: myPortfolio,
    imageUrl: myPortfolio,
    url: 'https://soumodwipmondal.vercel.app/',
    date: "2025"
  },
  {
    id: 16,
    title: "Making Predictions Using data",
    description: "I have done a statistical analysis of the marketing data using Python and Pandas. I have also used Matplotlib to visualize the data.",
    categories: ["data analysis"],
    tags: ["Python", "Pandas", "Matplotlib"],
    image: data_analysis,
    imageUrl: data_analysis,
    url: 'https://github.com/Soumodwip-Mondal/Marketing-Analytics-Exploratory-Statistical-Analysis-task.git',
    date: "2025"
  },
  {
    id: 17,
    title: "Jeevan Vase",
    description: "Website for a NGO and Individual.",
    categories: ["group"],
    tags: ["TypeScript", "React.js", "Shacn", "Socket io", "Tailwind CSS", "Node.js"],
    image: jeevan,
    imageUrl: jeevan,
    url: 'https://github.com/Soumodwip-Mondal/Jeevan-verse2.git',
    date: "2025"
  }

]

export default projects;