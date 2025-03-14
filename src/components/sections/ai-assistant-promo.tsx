import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

export default function AIAssistantPromo() {
  return (
    <section id="ai-assistant-promo" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            AI Portfolio Assistant
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore my portfolio with the help of an AI assistant that can answer questions about my projects, skills, and experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Chat</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Ask questions about my projects, skills, and experience in a natural conversation.
            </p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit">
              <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Portfolio Guide</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Get personalized recommendations on which projects to explore based on your interests.
            </p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full w-fit">
              <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Technology</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Experience a demonstration of my skills in implementing AI-powered features.
            </p>
          </Card>
        </div>
        
        <div className="flex justify-center mt-10">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Link to="/ai-assistant">
              <Bot className="mr-2 h-5 w-5" />
              Try the AI Assistant
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
} 