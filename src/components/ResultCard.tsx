import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { type FlamesGameData, getFlamesInfo } from '../utils/flames';

interface ResultCardProps {
  gameData: FlamesGameData;
  maleImage: string | null;
  femaleImage: string | null;
  caricatureImage: string | null;
  onReset: () => void;
}

const resultMessages: Record<string, string> = {
  Friends: "Best of friends — a bond that lasts a lifetime.",
  Lovers: "True love! A romance written in the stars.",
  Affection: "Deep affection that brings you closer every day.",
  Marriage: "Marriage is in your cards — a lifetime of love.",
  'Enemy': "An Enemy that will always be there for you.",
  'Soul Mates': "Soul mates, destined to find each other.",
};

export default function ResultCard({
  gameData,
  maleImage,
  femaleImage,
  caricatureImage,
  onReset,
}: ResultCardProps) {
  const info = getFlamesInfo(gameData.result);

  useEffect(() => {
    const timer = setTimeout(() => {
      onReset();
    }, 4000); // Increased to 7s
    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 sm:py-8"
      style={{ backgroundImage: "url('/bgs/Background.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F43F5E]/80 mb-1 drop-shadow">Your result</p>
          <h1
            className={`text-6xl sm:text-7xl font-black bg-gradient-to-r ${info.color} bg-clip-text text-transparent mb-1 text-shadow-glow`}
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            {gameData.result}
          </h1>
          <p className="text-[#F43F5E] text-sm sm:text-base max-w-xs mx-auto leading-relaxed drop-shadow font-medium">
            {resultMessages[gameData.result]}
          </p>
        </motion.div>

        {caricatureImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-sm sm:max-w-md mb-8 sm:mb-10"
          >
            <img
              src={caricatureImage}
              alt="Couple caricature"
              className="w-full rounded-3xl shadow-2xl object-cover border-4 border-white"
              style={{ height: '580px', objectPosition: 'top' }}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-lg bg-white/20 backdrop-blur-lg border border-white/40 rounded-3xl p-6 sm:p-10 text-center shadow-2xl"
        >
          <p className="text-[#F43F5E] text-2xl sm:text-3xl font-black drop-shadow tracking-tight whitespace-pre-line" style={{ fontFamily: 'Caveat, cursive' }}>
            Happy Anniversary 😍
            {"\n\n"}
            Real love = Thodi si nok- jhok{"\n"}+ unlimited Care💞
            {"\n\n"}
            Cheers to another year of wedded bliss.👩‍❤️‍👨
          </p>
        </motion.div>
      </div>
    </div>
  );
}


