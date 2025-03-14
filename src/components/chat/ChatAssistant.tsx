import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';

// Define message types
type MessageType = 'user' | 'assistant';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

// Sample responses based on keywords
const responses = {
  greetings: [
    "Hello! I'm Soumodwip's AI assistant. How can I help you today?",
    "Hi there! I'm here to help you navigate Soumodwip's portfolio. What would you like to know?",
    "Welcome! I can tell you about Soumodwip's projects, skills, or experience. What are you interested in?"
  ],
  projects: [
    "Soumodwip has worked on several impressive projects including web applications, data analysis tools, and interactive dashboards. Would you like to know more about a specific project?",
    "Some notable projects include a collaborative drawing board, data visualization dashboard, and AR portfolio experience. Which one interests you?",
    "The portfolio showcases various projects demonstrating skills in React, TypeScript, data analysis, and more. I can provide details on any specific project."
  ],
  skills: [
    "Soumodwip's key skills include React, TypeScript, Python, data analysis, and UI/UX design. Which skill would you like to know more about?",
    "Technical skills include frontend development with React, backend with Node.js, data analysis with Python, and more. Any specific skill you're curious about?",
    "Soumodwip is proficient in modern web technologies, data visualization, and has experience with AI/ML concepts. What specific skills are you interested in?"
  ],
  experience: [
    "Soumodwip has experience in full-stack development, data analysis, and creating interactive web applications. Would you like specific details about work history?",
    "Professional experience includes working on various web development projects and data analysis tasks. I can provide more specific information if needed.",
    "The portfolio showcases both professional work and personal projects that demonstrate practical experience with modern technologies."
  ],
  contact: [
    "You can contact Soumodwip via email at msoumodwip485@gmail.com or through the contact form on this website.",
    "Feel free to use the contact section at the bottom of the page to send a message directly.",
    "For professional inquiries, you can reach out via LinkedIn or email, both linked in the contact section."
  ],
  default: [
    "I'm not sure I understand. Could you rephrase your question? I can help with information about projects, skills, or how to get in touch.",
    "I don't have specific information about that. Would you like to know about Soumodwip's projects, skills, or experience instead?",
    "I'm still learning! Could you ask about projects, skills, experience, or how to contact Soumodwip?"
  ]
};

// Function to generate a response based on user input
const generateResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase();
  
  // Check for greetings
  if (/hello|hi|hey|greetings|howdy/i.test(lowercaseInput)) {
    return getRandomResponse('greetings');
  }
  
  // Check for project-related queries
  if (/project|portfolio|work|app|application|website|dashboard|game/i.test(lowercaseInput)) {
    return getRandomResponse('projects');
  }
  
  // Check for skill-related queries
  if (/skill|technology|tech stack|language|framework|react|javascript|typescript|python|node|data/i.test(lowercaseInput)) {
    return getRandomResponse('skills');
  }
  
  // Check for experience-related queries
  if (/experience|job|work|career|history|background|company/i.test(lowercaseInput)) {
    return getRandomResponse('experience');
  }
  
  // Check for contact-related queries
  if (/contact|email|phone|reach|message|connect/i.test(lowercaseInput)) {
    return getRandomResponse('contact');
  }
  
  // Default response
  return getRandomResponse('default');
};

// Helper to get a random response from a category
const getRandomResponse = (category: keyof typeof responses): string => {
  const categoryResponses = responses[category];
  const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  return categoryResponses[randomIndex];
};

// Initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    text: "👋 Hi there! I'm Soumodwip's AI assistant. I can help you learn about projects, skills, or how to get in touch. What would you like to know?",
    timestamp: new Date()
  }
];

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: generateResponse(userMessage.text),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  // Handle input submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
  
  // Minimize/maximize chat window
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };
  
  return (
    <>
      {/* Chat button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-20 right-6 z-50 w-full max-w-md"
          >
            <Card className="overflow-hidden shadow-xl border-2 border-blue-200 dark:border-blue-900">
              {/* Chat header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white flex justify-between items-center">
                <div className="flex items-center">
                  <Bot className="mr-2" size={20} />
                  <h3 className="font-bold">Portfolio Assistant</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleMinimize}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                  </button>
                  <button 
                    onClick={toggleChat}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {/* Chat messages */}
              {!isMinimized && (
                <div className="h-96 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className="flex items-start max-w-[80%]">
                        {message.type === 'assistant' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src="/images/ai-assistant.png" alt="AI" />
                            <AvatarFallback className="bg-blue-500 text-white">AI</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        
                        {message.type === 'user' && (
                          <Avatar className="h-8 w-8 ml-2 mt-1">
                            <AvatarImage src="/images/profile.jpg" alt="User" />
                            <AvatarFallback className="bg-green-500 text-white">
                              <User size={16} />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-center mb-4">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/images/ai-assistant.png" alt="AI" />
                        <AvatarFallback className="bg-blue-500 text-white">AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
              
              {/* Chat input */}
              {!isMinimized && (
                <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center">
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 mr-2"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};