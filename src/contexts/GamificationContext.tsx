import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Define types for our achievements and easter eggs
export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

export type EasterEgg = {
  id: string;
  found: boolean;
  hint: string;
};

export type GamificationContextType = {
  achievements: Achievement[];
  easterEggs: EasterEgg[];
  points: number;
  level: number;
  unlockAchievement: (id: string) => void;
  findEasterEgg: (id: string) => void;
  addPoints: (amount: number) => void;
  showAchievementNotification: boolean;
  setShowAchievementNotification: (show: boolean) => void;
  lastUnlockedAchievement: Achievement | null;
  resetProgress: () => void;
  puzzlesSolved: string[];
  solvePuzzle: (id: string) => void;
};

// Initial achievements
const initialAchievements: Achievement[] = [
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
  {
    id: 'treasureHunter',
    title: 'Treasure Hunter',
    description: 'Find 3 easter eggs',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'nightOwl',
    title: 'Night Owl',
    description: 'Switch to dark mode',
    icon: '🦉',
    unlocked: false,
  },
  {
    id: 'puzzleMaster',
    title: 'Puzzle Master',
    description: 'Solve all puzzles',
    icon: '🧩',
    unlocked: false,
  },
  {
    id: 'gameChampion',
    title: 'Game Champion',
    description: 'Score over 500 points in the mini-game',
    icon: '🎮',
    unlocked: false,
  },
];

// Initial easter eggs
const initialEasterEggs: EasterEgg[] = [
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
  {
    id: 'footerSecret',
    found: false,
    hint: 'The footer has a hidden message',
  },
  {
    id: 'skillsEasterEgg',
    found: false,
    hint: 'Try clicking on specific skills in a certain order',
  },
  {
    id: 'projectsEasterEgg',
    found: false,
    hint: 'One of the projects has a hidden feature',
  },
];

// Create the context
const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// Provider component
export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  // Use localStorage to persist gamification state
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(
    'portfolio-achievements',
    initialAchievements
  );
  const [easterEggs, setEasterEggs] = useLocalStorage<EasterEgg[]>(
    'portfolio-easter-eggs',
    initialEasterEggs
  );
  const [points, setPoints] = useLocalStorage<number>('portfolio-points', 0);
  const [puzzlesSolved, setPuzzlesSolved] = useLocalStorage<string[]>(
    'portfolio-puzzles',
    []
  );
  
  // UI state for notifications
  const [showAchievementNotification, setShowAchievementNotification] = useState(false);
  const [lastUnlockedAchievement, setLastUnlockedAchievement] = useState<Achievement | null>(null);
  
  // Calculate level based on points
  const level = Math.floor(points / 100) + 1;
  
  // Unlock an achievement
  const unlockAchievement = (id: string) => {
    const achievement = achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      const updatedAchievements = achievements.map(a => 
        a.id === id ? { ...a, unlocked: true } : a
      );
      setAchievements(updatedAchievements);
      setLastUnlockedAchievement(achievement);
      setShowAchievementNotification(true);
      addPoints(50); // Award points for unlocking an achievement
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setShowAchievementNotification(false);
      }, 3000);
    }
  };
  
  // Find an easter egg
  const findEasterEgg = (id: string) => {
    const easterEgg = easterEggs.find(e => e.id === id);
    if (easterEgg && !easterEgg.found) {
      const updatedEasterEggs = easterEggs.map(e => 
        e.id === id ? { ...e, found: true } : e
      );
      setEasterEggs(updatedEasterEggs);
      addPoints(30); // Award points for finding an easter egg
      
      // Check if the treasure hunter achievement should be unlocked
      const foundCount = updatedEasterEggs.filter(e => e.found).length;
      if (foundCount >= 3) {
        unlockAchievement('treasureHunter');
      }
    }
  };
  
  // Add points
  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };
  
  // Solve a puzzle
  const solvePuzzle = (id: string) => {
    if (!puzzlesSolved.includes(id)) {
      setPuzzlesSolved([...puzzlesSolved, id]);
      addPoints(40); // Award points for solving a puzzle
      
      // Check if all puzzles are solved
      if (puzzlesSolved.length + 1 >= 3) { // Assuming we have 3 puzzles
        unlockAchievement('puzzleMaster');
      }
    }
  };
  
  // Reset all progress
  const resetProgress = () => {
    setAchievements(initialAchievements);
    setEasterEggs(initialEasterEggs);
    setPoints(0);
    setPuzzlesSolved([]);
  };
  
  // Check for the explorer achievement
  useEffect(() => {
    const checkExplorerAchievement = () => {
      // This will be updated with actual logic to track section visits
      const visitedSections = localStorage.getItem('visited-sections');
      if (visitedSections) {
        const sections = JSON.parse(visitedSections);
        const requiredSections = ['hero', 'projects', 'skills', 'contact', 'interactive-playground', 'dashboard'];
        const allVisited = requiredSections.every(section => sections.includes(section));
        
        if (allVisited) {
          unlockAchievement('explorer');
        }
      }
    };
    
    checkExplorerAchievement();
  }, []);
  
  return (
    <GamificationContext.Provider
      value={{
        achievements,
        easterEggs,
        points,
        level,
        unlockAchievement,
        findEasterEgg,
        addPoints,
        showAchievementNotification,
        setShowAchievementNotification,
        lastUnlockedAchievement,
        resetProgress,
        puzzlesSolved,
        solvePuzzle,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

// Custom hook to use the gamification context
export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}; 