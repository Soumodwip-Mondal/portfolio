import { motion } from 'framer-motion';
import { ChatAssistant } from '../components/chat/Chatassistant';
import { Card } from '../components/ui/card';
import { Brain, MessageSquare, Code, Sparkles, Bot, Zap } from 'lucide-react';

export default function AIAssistantPage() {
  // Features of the AI assistant
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: "Interactive Chat",
      description: "Engage in natural conversations with the AI assistant to get information about my portfolio, projects, and skills."
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Portfolio Knowledge",
      description: "The assistant is trained on information about my projects, skills, and experience to provide accurate and helpful responses."
    },
    {
      icon: <Code className="h-8 w-8 text-green-500" />,
      title: "Technical Expertise",
      description: "Ask about specific technologies, frameworks, or programming languages I've worked with to learn more about my technical skills."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
      title: "Personalized Guidance",
      description: "Get personalized recommendations on which projects to explore based on your interests or technical background."
    },
    {
      icon: <Bot className="h-8 w-8 text-red-500" />,
      title: "AI Implementation",
      description: "This assistant showcases my ability to implement AI-powered features and create engaging user experiences."
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-500" />,
      title: "Instant Responses",
      description: "Get immediate answers to your questions without having to search through the portfolio manually."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            AI Portfolio Assistant
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Meet my AI-powered portfolio assistant, designed to help you navigate my work, 
            answer questions about my skills and experience, and provide information about my projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                This AI assistant uses natural language processing to understand your questions and provide relevant information about my portfolio. 
                It's designed to simulate a conversation with me, giving you insights into my work and skills.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                The assistant can help with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                <li>Finding specific projects in my portfolio</li>
                <li>Learning about my technical skills and experience</li>
                <li>Understanding my approach to problem-solving</li>
                <li>Getting contact information</li>
                <li>Navigating to different sections of the portfolio</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300">
                Try asking questions like "What projects have you worked on?" or "Tell me about your skills in React" to see it in action.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Try It Out</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Click the chat button in the bottom right corner to start a conversation with the AI assistant. 
                You can ask questions about my projects, skills, or experience.
              </p>
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600 mb-4">
                <p className="font-medium mb-2">Sample Questions:</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>"What projects have you worked on?"</li>
                  <li>"Tell me about your experience with React"</li>
                  <li>"What are your main skills?"</li>
                  <li>"How can I contact you?"</li>
                  <li>"Show me your data visualization work"</li>
                </ul>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Note: This is a simulated AI assistant that provides pre-defined responses based on keywords in your questions.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              This AI assistant showcases my ability to implement interactive and engaging features using modern web technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-4">
              <li>Built with React and TypeScript for type safety and component reusability</li>
              <li>Styled with Tailwind CSS for responsive and modern UI design</li>
              <li>Animated with Framer Motion for smooth transitions and interactions</li>
              <li>Pattern matching for natural language understanding</li>
              <li>State management for conversation history and context</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300">
              In a production environment, this could be extended with more advanced natural language processing, 
              machine learning models, or integration with external AI services like OpenAI's GPT for more sophisticated responses.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* The ChatAssistant component will be rendered here and available throughout the site */}
      <ChatAssistant />
    </div>
  );
}