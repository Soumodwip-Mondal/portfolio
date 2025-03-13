import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import { GamificationDashboard } from '../../components/gamification/GamificationDashboard';
import { createPortal } from 'react-dom';

export const GamificationButton = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const openDashboard = () => {
    setShowDashboard(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeDashboard = () => {
    setShowDashboard(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={openDashboard}
        className="relative"
        title="Portfolio Adventure"
      >
        <Trophy size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          !
        </span>
      </Button>

      {showDashboard && createPortal(
        <GamificationDashboard onClose={closeDashboard} />,
        document.body
      )}
    </>
  );
}; 