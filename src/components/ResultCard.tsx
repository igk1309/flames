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
  Affection: "\nIn your little gestures,\nI find my forever",
  Marriage: "Marriage — a lifetime of love.",
  'Enemy': "\nWhat started as a game, labelled them as enemies-\n" +
    "But destiny smiled quietly-\n" +
    "And turned it into a lifetime of Eternal bond",
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
    }, 6000); // 6s duration
    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center px-4 pt-20 pb-12 overflow-x-hidden"
      style={{ backgroundImage: "url('/bgs/Background.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: 'Neucha, cursive' }}
    >
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-4 sm:mb-6"
        >
          {/* <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#650000]/80 mb-0 drop-shadow">Your result</p>
          <h1
            className={`text-5xl sm:text-6xl font-black bg-gradient-to-r ${info.color} bg-clip-text text-transparent py-1 text-shadow-glow`}
            style={{ fontFamily: 'Neucha, cursive', lineHeight: '1.2' }}
          >
            {gameData.result}
          </h1> */}
          <p className="text-[#650000] text-xl sm:text-2xl max-w-2xl mx-auto leading-snug drop-shadow font-black tracking-normal whitespace-pre-line">
            {resultMessages[gameData.result]}
          </p>
        </motion.div>

        {caricatureImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-md sm:max-w-lg mb-6 sm:mb-8"
          >
            <img
              src={caricatureImage}
              alt="Couple caricature"
              className="w-full rounded-2xl shadow-xl object-cover border-4 border-white"
              style={{ height: '560px', objectPosition: 'top' }}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl text-center"
        >
          <p className="text-[#650000] text-xl sm:text-2xl font-black drop-shadow tracking-tight whitespace-pre-line leading-tight" style={{ fontFamily: 'Neucha, cursive' }}>
            <span className="text-3xl sm:text-4xl">Happy Anniversary</span>
            {"\n\n"}
            "You + Me = Everything Feels Right "
            {"\n\n"}
            Cheers to another year of
            {"\n"}
            wedded bliss
          </p>
        </motion.div>
      </div>
    </div>
  );
}


