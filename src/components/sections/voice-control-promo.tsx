import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Mic, Volume2, Navigation, Layers, Sparkles, Brain } from 'lucide-react';

export default function VoiceControlPage() {
  // Features of the voice control
  const features = [
    {
      icon: <Mic className="h-8 w-8 text-indigo-500" />,
      title: "Voice Commands",
      description: "Navigate my portfolio using natural voice commands. Simply speak to control the interface."
    },
    {
      icon: <Navigation className="h-8 w-8 text-blue-500" />,
      title: "Hands-free Navigation",
      description: "Move between pages and sections without clicking. Perfect for accessibility or when your hands are busy."
    },
    {
      icon: <Volume2 className="h-8 w-8 text-green-500" />,
      title: "Voice Responses",
      description: "Get audible feedback when your commands are recognized, creating a conversational experience."
    },
    {
      icon: <Layers className="h-8 w-8 text-amber-500" />,
      title: "Multiple Command Types",
      description: "Navigate to pages, scroll to sections, toggle settings, and ask questions about my background and skills."
    },
    {
      icon: <Brain className="h-8 w-8 text-red-500" />,
      title: "Speech Recognition",
      description: "Powered by the Web Speech API to accurately recognize and process your voice commands."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: "Interactive Experience",
      description: "Demonstrates my ability to create engaging, accessible interfaces using modern web technologies."
    }
  ];

  // Example voice commands
  const exampleCommands = [
    { command: "Go to dashboard", action: "Navigates to the dashboard page" },
    { command: "Show projects", action: "Scrolls to the projects section" },
    { command: "Toggle theme", action: "Switches between light and dark mode" },
    { command: "What are your skills", action: "Provides information about skills and scrolls to the skills section" },
    { command: "Help", action: "Shows a list of all available commands" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Voice-Controlled Navigation
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Experience a hands-free way to explore my portfolio using voice commands. 
            This feature demonstrates my ability to create accessible and innovative interfaces.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                The voice control feature uses the Web Speech API to recognize your voice commands and navigate the portfolio accordingly.
                It's designed to provide a natural and intuitive way to interact with the site.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                To get started:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                <li>Click the microphone button in the bottom left corner of the screen</li>
                <li>Allow microphone access when prompted by your browser</li>
                <li>Speak a command clearly (try saying "help" to see all available commands)</li>
                <li>The system will process your command and provide audio feedback</li>
              </ol>
              <p className="text-slate-600 dark:text-slate-300">
                This feature works best in Chrome and Edge browsers, which have the best support for the Web Speech API.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Example Commands</h2>
              <div className="space-y-3">
                {exampleCommands.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mr-3 mt-1">
                      <Mic className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium">{item.command}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Say "help" at any time to see a complete list of available commands.
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
              This voice control feature showcases my ability to implement innovative and accessible interfaces:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-4">
              <li>Built with the Web Speech API for speech recognition and synthesis</li>
              <li>Implemented in React with TypeScript for type safety</li>
              <li>Uses pattern matching to identify commands from natural language</li>
              <li>Provides both visual and audio feedback for an enhanced user experience</li>
              <li>Designed with accessibility in mind to support different ways of interacting with the portfolio</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300">
              In a production environment, this could be extended with more advanced natural language processing 
              or integration with AI services for more sophisticated voice interactions.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 