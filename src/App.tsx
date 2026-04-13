import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CoupleSelector from './components/CoupleSelector';
import InputSection from './components/InputSection';
import FlamesStrikeAnimation from './components/FlamesStrikeAnimation';
import ResultCard from './components/ResultCard';
import { calculateFLAMES, type FlamesGameData } from './utils/flames';
import { type CoupleDataWithImages } from './utils/dataLoader';

type Stage = 'select' | 'input' | 'animation' | 'result';

interface GameState {
  couple: CoupleDataWithImages;
  gameData: FlamesGameData;
}

export default function App() {
  const [stage, setStage] = useState<Stage>('select');
  const [couple, setCouple] = useState<CoupleDataWithImages | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleCoupleSelect = (selected: CoupleDataWithImages) => {
    setCouple(selected);
    setStage('input');
  };

  const handleStartAnimation = (player1: string, player2: string) => {
    const gameData = calculateFLAMES(player1, player2);
    setGameState({ couple: couple!, gameData });
    setStage('animation');
  };

  const handleAnimationComplete = () => {
    setStage('result');
  };

  const handleReset = () => {
    setCouple(null);
    setGameState(null);
    setStage('select');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <AnimatePresence mode="wait">
        {stage === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <CoupleSelector onCoupleSelect={handleCoupleSelect} />
          </motion.div>
        )}

        {stage === 'input' && couple && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <InputSection
              onStartAnimation={handleStartAnimation}
              defaultMaleName={couple.maleName}
              defaultFemaleName={couple.femaleName}
            />
          </motion.div>
        )}

        {stage === 'animation' && gameState && (
          <motion.div
            key="animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <FlamesStrikeAnimation
              gameData={gameState.gameData}
              maleImage={gameState.couple.maleImageUrl}
              femaleImage={gameState.couple.femaleImageUrl}
              onComplete={handleAnimationComplete}
            />
          </motion.div>
        )}

        {stage === 'result' && gameState && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ResultCard
              gameData={gameState.gameData}
              maleImage={gameState.couple.maleImageUrl}
              femaleImage={gameState.couple.femaleImageUrl}
              caricatureImage={gameState.couple.caricatureImageUrl}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
