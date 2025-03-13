import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

type Card = {
  id: number;
  content: string;
  flipped: boolean;
  matched: boolean;
};

export const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Card contents - programming related emojis
  const cardContents = ['🐍', '🦊', '☕', '🐘', '🐫', '🦓', '🐧', '🦔'];

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards
    const initialCards: Card[] = [];
    [...cardContents, ...cardContents].forEach((content, index) => {
      initialCards.push({
        id: index,
        content,
        flipped: false,
        matched: false,
      });
    });

    // Shuffle cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore if already flipped or matched
    if (cards.find(card => card.id === id)?.flipped || cards.find(card => card.id === id)?.matched) {
      return;
    }

    // Ignore if two cards are already flipped
    if (flippedCards.length === 2) {
      return;
    }

    // Flip the card
    setCards(cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    ));

    // Add to flipped cards
    setFlippedCards([...flippedCards, id]);
  };

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);
      
      if (firstCard?.content === secondCard?.content) {
        // Match found
        setCards(cards.map(card => 
          card.id === first || card.id === second 
            ? { ...card, matched: true, flipped: false } 
            : card
        ));
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === first || card.id === second 
              ? { ...card, flipped: false } 
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  // Check for game over
  useEffect(() => {
    if (gameStarted && cards.every(card => card.matched)) {
      setGameOver(true);
      // In a real implementation, we would call the unlockAchievement function from the context
    }
  }, [cards, gameStarted]);

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">Memory Game</h3>
      <p className="text-center mb-4 text-slate-600 dark:text-slate-300">
        Match pairs of programming language symbols to win!
      </p>
      
      {!gameStarted ? (
        <div className="text-center">
          <Button onClick={initializeGame}>Start Game</Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <div>Moves: {moves}</div>
            <Button variant="outline" size="sm" onClick={initializeGame}>Restart</Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {cards.map(card => (
              <motion.div
                key={card.id}
                className={`aspect-square flex items-center justify-center text-2xl rounded-lg cursor-pointer ${
                  card.flipped || card.matched 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
                onClick={() => handleCardClick(card.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {card.flipped || card.matched ? card.content : ''}
              </motion.div>
            ))}
          </div>
          
          {gameOver && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-center">
              <p className="font-bold">Congratulations! 🎉</p>
              <p>You completed the game in {moves} moves.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}; 