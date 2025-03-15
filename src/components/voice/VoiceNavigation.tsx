import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useScrollToSection } from '../../hooks/useScrollToSection';
// import { useAppContext } from '../../App';

// Add type declarations for the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// Define command types
type CommandType = 'navigation' | 'section' | 'action' | 'question';

interface VoiceCommand {
  type: CommandType;
  keywords: string[];
  action: (transcript: string) => void;
  description: string;
}

export const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();
  const { scrollToSection } = useScrollToSection();
  // const { setIsLoading } = useAppContext();

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser. Try using Chrome.');
      return;
    }

    // Create speech recognition instance
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // Configure recognition
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    // Set up event handlers
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setFeedback('Listening...');
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      setFeedback('');
    };

    recognitionRef.current.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptText = result[0].transcript.toLowerCase().trim();
      setTranscript(transcriptText);
      
      if (result.isFinal) {
        handleCommand(transcriptText);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access to use voice commands.');
      } else {
        setError(`Error: ${event.error}`);
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Define voice commands
  const commands: VoiceCommand[] = [
    // Navigation commands
    {
      type: 'navigation',
      keywords: ['go to home', 'home page', 'main page'],
      action: () => navigate('/'),
      description: 'Go to home page'
    },
    {
      type: 'navigation',
      keywords: ['go to blog', 'show blog', 'open blog'],
      action: () => navigate('/blog'),
      description: 'Go to blog page'
    },
    {
      type: 'navigation',
      keywords: ['go to dashboard', 'show dashboard', 'open dashboard'],
      action: () => navigate('/dashboard'),
      description: 'Go to dashboard page'
    },
    {
      type: 'navigation',
      keywords: ['go to ai assistant', 'show ai assistant', 'open ai assistant'],
      action: () => navigate('/ai-assistant'),
      description: 'Go to AI assistant page'
    },
    {
      type: 'navigation',
      keywords: ['go to collaborate', 'show collaborate', 'open collaborate', 'drawing board'],
      action: () => navigate('/collaborate'),
      description: 'Go to collaborative drawing page'
    },
    
    // Section navigation commands
    {
      type: 'section',
      keywords: ['scroll to about', 'show about', 'about section'],
      action: () => scrollToSection('about'),
      description: 'Scroll to About section'
    },
    {
      type: 'section',
      keywords: ['scroll to projects', 'show projects', 'projects section'],
      action: () => scrollToSection('projects'),
      description: 'Scroll to Projects section'
    },
    {
      type: 'section',
      keywords: ['scroll to skills', 'show skills', 'skills section'],
      action: () => scrollToSection('skills'),
      description: 'Scroll to Skills section'
    },
    {
      type: 'section',
      keywords: ['scroll to contact', 'show contact', 'contact section'],
      action: () => scrollToSection('contact'),
      description: 'Scroll to Contact section'
    },
    
    // Action commands
    {
      type: 'action',
      keywords: ['toggle theme', 'switch theme', 'dark mode', 'light mode'],
      action: () => {
        const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        speakFeedback(`Switched to ${theme} mode`);
      },
      description: 'Toggle between light and dark theme'
    },
    {
      type: 'action',
      keywords: ['show commands', 'list commands', 'help', 'what can i say'],
      action: () => setShowCommands(true),
      description: 'Show available voice commands'
    },
    {
      type: 'action',
      keywords: ['hide commands', 'close commands'],
      action: () => setShowCommands(false),
      description: 'Hide voice commands list'
    },
    
    // Question commands
    {
      type: 'question',
      keywords: ['who are you', 'tell me about yourself', 'your background'],
      action: () => {
        speakFeedback("I'm Soumodwip Mondal, a developer with expertise in web development, data visualization, and interactive applications.");
      },
      description: 'Ask about the portfolio owner'
    },
    {
      type: 'question',
      keywords: ['what are your skills', 'tell me your skills', 'your expertise'],
      action: () => {
        speakFeedback("My skills include React, TypeScript, data visualization, UI/UX design, and building interactive web applications.");
        scrollToSection('skills');
      },
      description: 'Ask about skills and expertise'
    },
    {
      type: 'question',
      keywords: ['contact information', 'how to contact', 'get in touch'],
      action: () => {
        speakFeedback("You can contact me through the contact form at the bottom of the page or via email.");
        scrollToSection('contact');
      },
      description: 'Ask about contact information'
    }
  ];

  // Process voice command
  const handleCommand = (text: string) => {
    let commandFound = false;
    
    for (const command of commands) {
      for (const keyword of command.keywords) {
        if (text.includes(keyword)) {
          // Execute the command
          command.action(text);
          
          // Provide feedback
          setFeedback(`Executing: ${command.description}`);
          speakFeedback(`Executing: ${command.description}`);
          
          commandFound = true;
          break;
        }
      }
      if (commandFound) break;
    }
    
    if (!commandFound) {
      setFeedback("Sorry, I didn't understand that command.");
      speakFeedback("Sorry, I didn't understand that command. Try saying 'help' to see available commands.");
    }
    
    // Stop listening after processing command
    setTimeout(() => {
      setFeedback('');
    }, 3000);
  };

  // Toggle listening state
  const toggleListening = () => {
    if (error) setError(null);
    
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  // Speak feedback using speech synthesis
  const speakFeedback = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Group commands by type for display
  const groupedCommands = commands.reduce((acc, command) => {
    if (!acc[command.type]) {
      acc[command.type] = [];
    }
    acc[command.type].push(command);
    return acc;
  }, {} as Record<CommandType, VoiceCommand[]>);

  return (
    <>
      {/* Voice control button */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          className={`p-4 rounded-full shadow-lg ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
          } text-white transition-colors`}
          onClick={toggleListening}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isListening ? "Stop listening" : "Start voice commands"}
        >
          {isListening ? <Mic size={24} /> : <MicOff size={24} />}
        </motion.button>
      </div>
      
      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-20 left-6 z-50 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 max-w-xs flex items-center"
          >
            <Volume2 className="text-blue-500 mr-2" size={20} />
            <p className="text-sm">{feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-20 left-6 z-50 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 shadow-lg rounded-lg p-3 max-w-xs flex items-center"
          >
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto text-xs text-red-600 dark:text-red-400"
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Commands list */}
      <AnimatePresence>
        {showCommands && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-20 left-6 z-50 bg-white dark:bg-slate-800 shadow-xl rounded-lg p-4 max-w-md max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Available Voice Commands</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCommands(false)}
              >
                Close
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Navigation Commands</h4>
                <ul className="space-y-1 text-sm">
                  {groupedCommands.navigation?.map((command, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-slate-400 mr-2">•</span>
                      <div>
                        <p className="font-medium">{command.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Say: "{command.keywords.join('" or "')}"
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold mb-2 text-green-600 dark:text-green-400">Section Commands</h4>
                <ul className="space-y-1 text-sm">
                  {groupedCommands.section?.map((command, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-slate-400 mr-2">•</span>
                      <div>
                        <p className="font-medium">{command.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Say: "{command.keywords.join('" or "')}"
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold mb-2 text-amber-600 dark:text-amber-400">Action Commands</h4>
                <ul className="space-y-1 text-sm">
                  {groupedCommands.action?.map((command, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-slate-400 mr-2">•</span>
                      <div>
                        <p className="font-medium">{command.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Say: "{command.keywords.join('" or "')}"
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold mb-2 text-blue-600 dark:text-blue-400">Question Commands</h4>
                <ul className="space-y-1 text-sm">
                  {groupedCommands.question?.map((command, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-slate-400 mr-2">•</span>
                      <div>
                        <p className="font-medium">{command.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Say: "{command.keywords.join('" or "')}"
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Click the microphone button in the bottom left corner to start/stop voice commands.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Transcript display (for debugging) */}
      {isListening && transcript && (
        <div className="fixed bottom-20 left-20 z-50 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 max-w-xs">
          <p className="text-xs text-slate-500">{transcript}</p>
        </div>
      )}
    </>
  );
}; 