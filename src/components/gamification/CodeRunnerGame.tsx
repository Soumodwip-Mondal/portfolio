import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// import { useGamification } from '../../contexts/GamificationContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

// Code blocks that will fall from the top
const codeBlocks = [
  { id: 1, code: 'const x = 10;', isValid: true },
  { id: 2, code: 'let y = "hello";', isValid: true },
  { id: 3, code: 'function add(a, b) { return a + b; }', isValid: true },
  { id: 4, code: 'console.log("Hello World");', isValid: true },
  { id: 5, code: 'const arr = [1, 2, 3];', isValid: true },
  { id: 6, code: 'if (x > 5) { return true; }', isValid: true },
  { id: 7, code: 'const obj = { name: "John" };', isValid: true },
  { id: 8, code: 'for (let i = 0; i < 10; i++) {}', isValid: true },
  { id: 9, code: 'const x = 10', isValid: false }, // Missing semicolon
  { id: 10, code: 'function add(a, b) { return a + b }', isValid: false }, // Missing semicolon
  { id: 11, code: 'console.log("Hello World")', isValid: false }, // Missing semicolon
  { id: 12, code: 'const arr = [1, 2, 3', isValid: false }, // Missing closing bracket
  { id: 13, code: 'if (x > 5) { return true', isValid: false }, // Missing closing brace
  { id: 14, code: 'const obj = { name: "John" ', isValid: false }, // Missing closing brace
  { id: 15, code: 'for (let i = 0; i < 10; i++ {}', isValid: false }, // Missing closing parenthesis
];

export const CodeRunnerGame = () => {
  // Remove the unused destructuring
  // const { addPoints, unlockAchievement } = useGamification();
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [fallingBlocks, setFallingBlocks] = useState<any[]>([]);
  const [speed, setSpeed] = useState(2000); // Initial speed in ms
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const blockGeneratorRef = useRef<number | null>(null);
  
  // Start the game
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setFallingBlocks([]);
    setSpeed(2000);
    
    // Start generating blocks
    blockGeneratorRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * codeBlocks.length);
      const newBlock = {
        ...codeBlocks[randomIndex],
        uniqueId: Date.now(),
        position: Math.random() * (gameAreaRef.current?.clientWidth || 400) - 100,
      };
      
      setFallingBlocks(prev => [...prev, newBlock]);
      
      // Increase speed as game progresses
      if (speed > 500) {
        setSpeed(prev => prev - 50);
      }
    }, speed);
    
    // Start game loop
    gameLoop();
  };
  
  // Game loop to update block positions
  const gameLoop = () => {
    gameLoopRef.current = requestAnimationFrame(() => {
      setFallingBlocks(prev => 
        prev.map(block => ({
          ...block,
          top: (block.top || 0) + 2, // Move blocks down
        }))
      );
      
      // Check if any blocks have fallen off the screen
      setFallingBlocks(prev => {
        const newBlocks = prev.filter(block => {
          const hasExited = (block.top || 0) > (gameAreaRef.current?.clientHeight || 600);
          
          // If a valid block exits, lose a life
          if (hasExited && block.isValid) {
            setLives(l => l - 1);
            return false;
          }
          
          // If an invalid block exits, that's good
          if (hasExited && !block.isValid) {
            setScore(s => s + 5);
            return false;
          }
          
          return true;
        });
        
        return newBlocks;
      });
      
      // Continue the game loop if not game over
      if (!gameOver && lives > 0) {
        gameLoop();
      }
    });
  };
  
  // Handle clicking on a code block
  const handleBlockClick = (blockId: number, isValid: boolean) => {
    // Remove the clicked block
    setFallingBlocks(prev => prev.filter(block => block.uniqueId !== blockId));
    
    if (isValid) {
      // If the block is valid code, add points
      setScore(prev => prev + 10);
    } else {
      // If the block is invalid code, that's good - add more points
      setScore(prev => prev + 20);
    }
  };
  
  // Check for game over
  useEffect(() => {
    if (lives <= 0 && gameActive) {
      setGameOver(true);
      // Clean up intervals and animation frames
      if (blockGeneratorRef.current) {
        clearInterval(blockGeneratorRef.current);
      }
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    }
  }, [lives, gameActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (blockGeneratorRef.current) {
        clearInterval(blockGeneratorRef.current);
      }
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  return (
    <Card className="w-full max-h-[80vh] overflow-hidden bg-white dark:bg-slate-900">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold">Code Runner</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Click on invalid code blocks (missing semicolons, brackets, etc.) and let valid code fall through.
        </p>
      </div>
      
      <div className="p-6">
        {!gameActive && !gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-4">Ready to test your coding skills?</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Click on code blocks with syntax errors and let valid code fall through.
              You have 3 lives - lose one each time valid code hits the bottom!
            </p>
            <Button onClick={startGame} size="lg">
              Start Game
            </Button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-4">Game Over!</h3>
            <p className="text-2xl font-bold mb-6">Your Score: {score}</p>
            <Button onClick={startGame} size="lg">
              Play Again
            </Button>
          </div>
        ) : (
          <div className="relative h-[400px]" ref={gameAreaRef}>
            <div className="absolute top-4 left-4 z-10 flex space-x-4">
              <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                Score: {score}
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                Lives: {Array(lives).fill('❤️').join(' ')}
              </div>
            </div>
            
            {fallingBlocks.map((block) => (
              <motion.div
                key={block.uniqueId}
                className={`absolute px-3 py-2 rounded cursor-pointer ${
                  block.isValid 
                    ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' 
                    : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                }`}
                style={{
                  left: block.position,
                  top: block.top || 0,
                  maxWidth: '200px',
                }}
                onClick={() => handleBlockClick(block.uniqueId, block.isValid)}
              >
                <code className="text-sm font-mono">
                  {block.code}
                </code>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}; 