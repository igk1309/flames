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
  E: 'Enemy',
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
      await wait(1500);
      if (cancelled) return;

      const remaining = [...FLAMES_LETTERS];

      for (let i = 0; i < gameData.steps.length; i++) {
        if (cancelled) return;
        const idx = gameData.steps[i];
        const letter = remaining[idx];
        if (!letter) break;

        setActiveStrike(letter);
        await wait(900); // Slower strike
        if (cancelled) return;

        setStruckLetters((prev) => new Set([...prev, letter]));
        remaining.splice(idx, 1);
        setActiveStrike(null);
        setCurrentStep(i + 1);
        await wait(600); // Slower pause
      }

      if (cancelled) return;
      await wait(800);
      setIsComplete(true);
      await wait(2800);
      if (!cancelled) onCompleteRef.current();
    };

    animate();
    return () => { cancelled = true; };
  }, [gameData]);

  const progress = gameData.steps.length > 0 ? (currentStep / gameData.steps.length) * 100 : 0;

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center px-4 py-8 sm:py-12 overflow-hidden"
      style={{ backgroundImage: "url('/bgs/Background2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="pencil" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.25" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="flex items-center justify-between w-full px-4 sm:px-8 pt-2 sm:pt-4 relative z-10 mb-8 mt-2">
        <img src="/bgs/logo1.png" alt="Logo" className="h-14 sm:h-18 object-contain" />
        <img src="/bgs/logo2.png" alt="Logo" className="h-14 sm:h-18 object-contain" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 sm:gap-4 justify-center mt-12 mb-12 sm:mb-16 flex-wrap relative z-10"
      >
        {FLAMES_LETTERS.map((letter) => {
          const isStruck = struckLetters.has(letter);
          const isActive = activeStrike === letter;
          return (
            <div key={letter} className="relative">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    scale: isActive ? 1.25 : isStruck ? 0.9 : 1,
                    opacity: isStruck ? 0.75 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center text-4xl sm:text-5xl rounded-full select-none shadow-xl border-2 ${
                    isStruck
                      ? 'bg-white/10 text-white border-white/20'
                      : 'bg-white text-rose-500 border-white'
                  }`}
                  style={{ fontFamily: 'Neucha, cursive' }}
                >
                  {letter}
                </motion.div>
                
                <motion.span 
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center max-w-[64px] leading-tight ${isStruck ? 'text-[#650000]/40' : 'text-[#650000] drop-shadow-md'}`}
                  style={{ opacity: isStruck ? 0.5 : 1 }}
                >
                  {FLAMES_MEANINGS[letter]}
                </motion.span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[-10px] w-full h-14 sm:h-18">
                <svg className="w-full h-full opacity-90 mix-blend-multiply" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.line
                    x1="20" y1="80" x2="80" y2="20"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: (isActive || isStruck) ? 1 : 0, 
                      opacity: (isActive || isStruck) ? 1 : 0 
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ filter: "url(#pencil)" }}
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-8 mb-8 relative z-10"
          >
            <div className="grid grid-cols-2 gap-6 mb-6 text-[#650000]">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider font-bold mb-1 opacity-80">Common Letters</p>
                <p className="text-4xl font-black drop-shadow">{gameData.commonLetters}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider font-bold mb-1 opacity-80">Count</p>
                <p className="text-4xl font-black drop-shadow">{gameData.totalCount}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/30">
              <div className="flex justify-between text-[10px] text-[#650000]/90 font-bold uppercase tracking-widest mb-3">
                <span>Eliminations</span>
                <span>{currentStep} / {gameData.steps.length}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-inner p-0.5 border border-white/10">
                <motion.div
                  className="h-full rounded-full bg-[#650000] shadow-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative z-10 -mt-16 mb-8 flex flex-col items-center"
          >
            <p className="text-base sm:text-lg text-[#650000]/90 font-bold uppercase tracking-widest mb-3 drop-shadow">Your relationship is</p>
            <motion.div 
              className="bg-white/30 backdrop-blur-md px-10 py-5 rounded-[2rem] border border-white/40 shadow-xl inline-block"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <p 
                className="text-6xl sm:text-7xl font-black text-[#650000] drop-shadow-md leading-tight" 
                style={{ fontFamily: 'Neucha, cursive' }}
              >
                {gameData.result}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {(maleImage || femaleImage) && (
        <motion.div
          animate={{ 
            y: isComplete ? 10 : 0,
            scale: isComplete ? 1.15 : 1,
            gap: isComplete ? '3rem' : '2rem'
          }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
          className="w-full max-w-sm flex relative z-10 px-4 mt-4"
        >
          {maleImage && (
            <div className="flex-1 aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-rose-200/30 scale-110">
              <img src={maleImage} alt={gameData.player1Name} className="w-full h-full object-cover object-top" />
            </div>
          )}
          {femaleImage && (
            <div className="flex-1 aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-rose-200/30 scale-110">
              <img src={femaleImage} alt={gameData.player2Name} className="w-full h-full object-cover object-top" />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
