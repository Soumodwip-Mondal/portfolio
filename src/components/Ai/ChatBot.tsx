import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';
<<<<<<< HEAD
import { getAIResponse } from '../../services/ai-service';
=======
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618

// Define message types
type MessageType = 'user' | 'assistant';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

<<<<<<< HEAD
=======
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

>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
// Initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
<<<<<<< HEAD
    text: "👋 Hi there! I'm Soumodwip's AI assistant powered by Google Gemini. I can help you learn about projects, skills, or how to get in touch. What would you like to know?",
=======
    text: "👋 Hi there! I'm Soumodwip's AI assistant. I can help you learn about projects, skills, or how to get in touch. What would you like to know?",
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
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
<<<<<<< HEAD

=======
  
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
<<<<<<< HEAD

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

=======
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
<<<<<<< HEAD

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Build conversation history for context
      const history = messages.slice(1).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        parts: msg.text
      }));

      // Get AI response
      const aiResponseText = await getAIResponse(userMessage.text, history);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: aiResponseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);

      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: "I'm having trouble connecting right now. Please try asking about Soumodwip's projects, skills, or contact information!",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle input submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

=======
    
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
  
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
<<<<<<< HEAD

=======
  
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
  // Minimize/maximize chat window
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };
<<<<<<< HEAD

=======
  
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-300 dark:bg-blue-700 opacity-70 animate-ping"></div>
        )}
        <motion.button
<<<<<<< HEAD
          className={`relative p-4 rounded-full shadow-lg ${isOpen
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            } text-white transition-colors`}
=======
          className={`relative p-4 rounded-full shadow-lg ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          } text-white transition-colors`}
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
<<<<<<< HEAD
          transition={{
=======
          transition={{ 
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {isOpen ? <X size={24} /> : (
            <div className="relative">
              <MessageSquare size={24} />
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-500">
                ?
              </span>
            </div>
          )}
        </motion.button>
      </div>
<<<<<<< HEAD

=======
      
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
<<<<<<< HEAD
            animate={{
              opacity: 1,
              y: 0,
=======
            animate={{ 
              opacity: 1, 
              y: 0, 
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
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
<<<<<<< HEAD
                  <button
=======
                  <button 
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                    onClick={toggleMinimize}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                  </button>
<<<<<<< HEAD
                  <button
=======
                  <button 
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                    onClick={toggleChat}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
<<<<<<< HEAD

=======
              
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
              {/* Chat messages */}
              {!isMinimized && (
                <div className="h-96 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
                  {messages.map((message) => (
                    <div
                      key={message.id}
<<<<<<< HEAD
                      className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
=======
                      className={`mb-4 flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                    >
                      <div className="flex items-start max-w-[80%]">
                        {message.type === 'assistant' && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Avatar className="h-8 w-8 mr-2 mt-1 ring-2 ring-blue-200 dark:ring-blue-800 shadow-md">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-white" />
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                        )}
<<<<<<< HEAD

=======
                        
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                        <motion.div
                          initial={{ opacity: 0, y: message.type === 'user' ? -10 : 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
<<<<<<< HEAD
                          className={`rounded-lg p-3 ${message.type === 'user'
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md'
                            }`}
=======
                          className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md'
                          }`}
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                        >
                          {message.type === 'assistant' && (
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-medium text-blue-500 dark:text-blue-400">AI Assistant</span>
                            </div>
                          )}
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
<<<<<<< HEAD
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
=======
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                            })}
                          </p>
                          {message.type === 'user' && (
                            <div className="flex justify-end">
                              <span className="text-xs font-medium text-blue-200">You</span>
                            </div>
                          )}
                        </motion.div>
<<<<<<< HEAD

=======
                        
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                        {message.type === 'user' && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Avatar className="h-8 w-8 ml-2 mt-1 ring-2 ring-green-200 dark:ring-green-800 shadow-md">
                              <AvatarFallback className="bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ))}
<<<<<<< HEAD

=======
                  
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-center mb-4">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar className="h-8 w-8 mr-2 ring-2 ring-blue-200 dark:ring-blue-800 shadow-md">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-md"
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </motion.div>
                    </div>
                  )}
<<<<<<< HEAD

                  <div ref={messagesEndRef} />
                </div>
              )}

=======
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
              
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
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
<<<<<<< HEAD
                  <Button
=======
                  <Button 
>>>>>>> b946aa5e932a1838633371eb2db3e8eb74c03618
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
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