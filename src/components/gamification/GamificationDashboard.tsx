import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Trophy, Search, Puzzle, Gamepad2 } from 'lucide-react';

// This is a simplified version since we don't have the context yet
export const GamificationDashboard = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('achievements');
  
  // Mock data for now
  const achievements = [
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Visit all sections of the portfolio',
      icon: '🧭',
      unlocked: false,
    },
    {
      id: 'codeWizard',
      title: 'Code Wizard',
      description: 'Interact with the code editor in the playground',
      icon: '🧙‍♂️',
      unlocked: false,
    },
    {
      id: 'dataAnalyst',
      title: 'Data Analyst',
      description: 'Explore all charts in the dashboard',
      icon: '📊',
      unlocked: false,
    },
  ];
  
  const easterEggs = [
    {
      id: 'secretCode',
      found: false,
      hint: 'Try typing "konami" somewhere on the site',
    },
    {
      id: 'hiddenLogo',
      found: false,
      hint: 'Some logos have secrets when you click them multiple times',
    },
  ];
  
  // Calculate progress percentages
  const achievementProgress = Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100);
  const easterEggProgress = Math.round((easterEggs.filter(e => e.found).length / easterEggs.length) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Card className="w-full max-w-3xl max-h-[80vh] overflow-hidden bg-white dark:bg-slate-900">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Portfolio Adventure</h2>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-lg flex-1 min-w-[200px]">
            <div className="text-sm uppercase tracking-wider opacity-80">Level</div>
            <div className="text-3xl font-bold">1</div>
            <div className="mt-2 h-2 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `10%` }}
              ></div>
            </div>
            <div className="mt-1 text-sm">10 points</div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg flex-1 min-w-[200px]">
            <div className="text-sm uppercase tracking-wider opacity-80">Achievements</div>
            <div className="text-3xl font-bold">0/{achievements.length}</div>
            <div className="mt-2 h-2 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${achievementProgress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-sm">{achievementProgress}% complete</div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-lg flex-1 min-w-[200px]">
            <div className="text-sm uppercase tracking-wider opacity-80">Easter Eggs</div>
            <div className="text-3xl font-bold">0/{easterEggs.length}</div>
            <div className="mt-2 h-2 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${easterEggProgress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-sm">{easterEggProgress}% found</div>
          </div>
        </div>
        
        <div className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex">
            <button
              className={`px-4 py-3 flex items-center ${activeTab === 'achievements' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-500'}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Trophy size={18} className="mr-2" />
              Achievements
            </button>
            <button
              className={`px-4 py-3 flex items-center ${activeTab === 'easterEggs' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-500'}`}
              onClick={() => setActiveTab('easterEggs')}
            >
              <Search size={18} className="mr-2" />
              Easter Eggs
            </button>
            <button
              className={`px-4 py-3 flex items-center ${activeTab === 'puzzles' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-500'}`}
              onClick={() => setActiveTab('puzzles')}
            >
              <Puzzle size={18} className="mr-2" />
              Puzzles
            </button>
            <button
              className={`px-4 py-3 flex items-center ${activeTab === 'games' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-500'}`}
              onClick={() => setActiveTab('games')}
            >
              <Gamepad2 size={18} className="mr-2" />
              Mini-Games
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[40vh]">
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${achievement.unlocked 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                    : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'}`}
                >
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{achievement.icon}</div>
                    <div>
                      <h3 className="font-bold">{achievement.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="ml-auto text-green-500 dark:text-green-400">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'easterEggs' && (
            <div className="space-y-4">
              {easterEggs.map(egg => (
                <div 
                  key={egg.id}
                  className={`p-4 rounded-lg border ${egg.found 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                    : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'}`}
                >
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{egg.found ? '🥚' : '❓'}</div>
                    <div>
                      <h3 className="font-bold">{egg.found ? `Easter Egg #${easterEggs.findIndex(e => e.id === egg.id) + 1}` : 'Hidden Easter Egg'}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {egg.found ? 'You found this easter egg!' : `Hint: ${egg.hint}`}
                      </p>
                    </div>
                    {egg.found && (
                      <div className="ml-auto text-green-500 dark:text-green-400">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'puzzles' && (
            <div className="space-y-4">
              <p className="mb-4">Solve puzzles throughout the portfolio to unlock special content about my projects!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg border bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700`}>
                  <h3 className="font-bold">Code Breaker</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Decrypt the hidden message in the projects section
                  </p>
                  <span className="text-amber-500 dark:text-amber-400">Unsolved</span>
                </div>
                
                <div className={`p-4 rounded-lg border bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700`}>
                  <h3 className="font-bold">Pattern Match</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Find the pattern in the skills section
                  </p>
                  <span className="text-amber-500 dark:text-amber-400">Unsolved</span>
                </div>
                
                <div className={`p-4 rounded-lg border bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700`}>
                  <h3 className="font-bold">Secret Message</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Uncover the hidden message in the contact form
                  </p>
                  <span className="text-amber-500 dark:text-amber-400">Unsolved</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'games' && (
            <div className="text-center py-4">
              <h3 className="text-xl font-bold mb-4">Code Runner</h3>
              <p className="mb-6">Test your coding reflexes in this fun mini-game!</p>
              <Button onClick={() => {
                alert("Mini-game coming soon!");
              }}>
                Play Code Runner
              </Button>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
          <Button variant="outline" size="sm" onClick={() => alert("Progress reset!")}>
            Reset Progress
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}; 