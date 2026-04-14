import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CoupleSelector from './components/CoupleSelector';
import InputSection from './components/InputSection';
import MaleIntroPage from './components/MaleIntroPage';
import FemaleIntroPage from './components/FemaleIntroPage';
import StoryPage from './components/StoryPage';
import FlamesStrikeAnimation from './components/FlamesStrikeAnimation';
import ResultCard from './components/ResultCard';
import AdPage from './components/AdPage';
import { calculateFLAMES, type FlamesGameData } from './utils/flames';
import { type CoupleDataWithImages } from './utils/dataLoader';

type Stage = 'select' | 'input' | 'maleIntro' | 'femaleIntro' | 'story' | 'animation' | 'result' | 'ad';

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
    setStage('maleIntro');
  };

  const handleReset = () => {
    setCouple(null);
    setGameState(null);
    setStage('select');
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf2f4]">
      <AnimatePresence mode="wait">
        {stage === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full absolute inset-0"
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
            className="w-full h-full absolute inset-0"
          >
            <InputSection
              onStartAnimation={handleStartAnimation}
              defaultMaleName={couple.maleName}
              defaultFemaleName={couple.femaleName}
            />
          </motion.div>
        )}



        {stage === 'maleIntro' && gameState && (
          <motion.div
            key="maleIntro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0"
          >
            <MaleIntroPage
              maleName={gameState.gameData.player1Name}
              maleImage={gameState.couple.maleImageUrl}
              onComplete={() => setStage('femaleIntro')}
            />
          </motion.div>
        )}

        {stage === 'femaleIntro' && gameState && (
          <motion.div
            key="femaleIntro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0"
          >
            <FemaleIntroPage
              femaleName={gameState.gameData.player2Name}
              femaleImage={gameState.couple.femaleImageUrl}
              onComplete={() => setStage('story')}
            />
          </motion.div>
        )}

        {stage === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0"
          >
            <StoryPage onComplete={() => setStage('animation')} />
          </motion.div>
        )}

        {stage === 'animation' && gameState && (
          <motion.div
            key="animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full absolute inset-0"
          >
            <FlamesStrikeAnimation
              gameData={gameState.gameData}
              maleImage={gameState.couple.maleImageUrl}
              femaleImage={gameState.couple.femaleImageUrl}
              onComplete={() => setStage('result')}
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
            className="w-full h-full absolute inset-0"
          >
            <ResultCard
              gameData={gameState.gameData}
              maleImage={gameState.couple.maleImageUrl}
              femaleImage={gameState.couple.femaleImageUrl}
              caricatureImage={gameState.couple.caricatureImageUrl}
              onReset={() => setStage('ad')}
            />
          </motion.div>
        )}

        {stage === 'ad' && (
          <motion.div
            key="ad"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0"
          >
            <AdPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
