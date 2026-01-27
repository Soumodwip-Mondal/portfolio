import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import { getAIResponse } from '../../services/ai-service';

// Define message types
type MessageType = 'user' | 'assistant';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

// Initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    text: "👋 Hi there! I'm Soumodwip's AI assistant powered by Google Gemini. I can help you learn about projects, skills, or how to get in touch. What would you like to know?",
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
  const handleSendMessage = async () => {
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
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-300 dark:bg-blue-700 opacity-70 animate-ping"></div>
        )}
        <motion.button
          className={`relative p-4 rounded-full shadow-lg ${isOpen
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            } text-white transition-colors`}
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
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
                      className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
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

                        <motion.div
                          initial={{ opacity: 0, y: message.type === 'user' ? -10 : 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`rounded-lg p-3 ${message.type === 'user'
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md'
                            }`}
                        >
                          {message.type === 'assistant' && (
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-medium text-blue-500 dark:text-blue-400">AI Assistant</span>
                            </div>
                          )}
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          {message.type === 'user' && (
                            <div className="flex justify-end">
                              <span className="text-xs font-medium text-blue-200">You</span>
                            </div>
                          )}
                        </motion.div>

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