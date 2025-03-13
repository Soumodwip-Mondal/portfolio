import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../../contexts/GamificationContext';

export const AchievementNotification = () => {
  const { showAchievementNotification, lastUnlockedAchievement, setShowAchievementNotification } = useGamification();

  return (
    <AnimatePresence>
      {showAchievementNotification && lastUnlockedAchievement && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-center">
            <div className="text-3xl mr-3">{lastUnlockedAchievement.icon}</div>
            <div>
              <h3 className="font-bold text-lg">Achievement Unlocked!</h3>
              <p className="font-semibold">{lastUnlockedAchievement.title}</p>
              <p className="text-sm opacity-90">{lastUnlockedAchievement.description}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAchievementNotification(false)}
            className="absolute top-2 right-2 text-white opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 