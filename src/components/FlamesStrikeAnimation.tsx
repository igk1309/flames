import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type FlamesGameData } from '../utils/flames';

interface FlamesStrikeAnimationProps {
  gameData: FlamesGameData;
  maleImage: string | null;
  femaleImage: string | null;
  onComplete: () => void;
}

const FLAMES_LETTERS = ['F', 'L', 'A', 'M', 'E', 'S'];
const FLAMES_MEANINGS: Record<string, string> = {
  F: 'Friends',
  L: 'Lovers',
  A: 'Affection',
  M: 'Marriage',
  E: 'Eternal Bond',
  S: 'Soul Mates',
};

export default function FlamesStrikeAnimation({
  gameData,
  maleImage,
  femaleImage,
  onComplete,
}: FlamesStrikeAnimationProps) {
  const [struckLetters, setStruckLetters] = useState<Set<string>>(new Set());
  const [activeStrike, setActiveStrike] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;

    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const animate = async () => {
      await wait(1200);
      if (cancelled) return;

      const remaining = [...FLAMES_LETTERS];

      for (let i = 0; i < gameData.steps.length; i++) {
        if (cancelled) return;
        const idx = gameData.steps[i];
        const letter = remaining[idx];
        if (!letter) break;

        setActiveStrike(letter);
        await wait(650);
        if (cancelled) return;

        setStruckLetters((prev) => new Set([...prev, letter]));
        remaining.splice(idx, 1);
        setActiveStrike(null);
        setCurrentStep(i + 1);
        await wait(450);
      }

      if (cancelled) return;
      await wait(600);
      setIsComplete(true);
      await wait(2200);
      if (!cancelled) onCompleteRef.current();
    };

    animate();
    return () => { cancelled = true; };
  }, [gameData]);

  const progress = gameData.steps.length > 0 ? (currentStep / gameData.steps.length) * 100 : 0;

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-8 sm:py-12">
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-black tracking-widest text-center mb-8 sm:mb-10"
      >
        <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
          FLAMES
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 sm:gap-4 justify-center mb-8 sm:mb-10 flex-wrap"
      >
        {FLAMES_LETTERS.map((letter) => {
          const isStruck = struckLetters.has(letter);
          const isActive = activeStrike === letter;
          return (
            <div key={letter} className="relative">
              <motion.div
                animate={{
                  scale: isActive ? 1.25 : isStruck ? 0.82 : 1,
                  opacity: isStruck ? 0.3 : 1,
                }}
                transition={{ duration: 0.28 }}
                className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl font-black rounded-full select-none ${
                  isStruck
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-gradient-to-br from-rose-400 to-orange-400 text-white shadow-md'
                }`}
              >
                {letter}
              </motion.div>

              <AnimatePresence>
                {isActive && (
                  <>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 1 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55 }}
                      className="absolute inset-0 rounded-full border-2 border-rose-400 pointer-events-none"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <span className="text-2xl font-black text-rose-600 leading-none">✕</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: -44 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none whitespace-nowrap z-10"
                    >
                      <span className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                        {FLAMES_MEANINGS[letter]} out!
                      </span>
                    </motion.div>
                  </>
                )}
                {isStruck && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-14 h-0.5 bg-rose-500 rotate-45 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-rose-100 p-5 sm:p-7 mb-6"
      >
        <div className="text-center mb-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">Calculating fate for</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {gameData.player1Name} <span className="text-rose-500">&amp;</span> {gameData.player2Name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Common Letters</p>
            <p className="text-3xl font-black text-rose-500">{gameData.commonLetters}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Count</p>
            <p className="text-3xl font-black text-orange-500">{gameData.totalCount}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-400 font-medium mb-2">
            <span>Eliminations</span>
            <span>{currentStep} / {gameData.steps.length}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="mt-5 pt-5 border-t border-gray-100 text-center"
            >
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Your relationship is</p>
              <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-rose-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                {gameData.result}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {(maleImage || femaleImage) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md flex gap-3 sm:gap-4"
        >
          {maleImage && (
            <img
              src={maleImage}
              alt={gameData.player1Name}
              className="flex-1 h-44 sm:h-56 object-cover rounded-2xl shadow-md"
            />
          )}
          {femaleImage && (
            <img
              src={femaleImage}
              alt={gameData.player2Name}
              className="flex-1 h-44 sm:h-56 object-cover rounded-2xl shadow-md"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
