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
  'Eternal Bond': "An eternal bond that transcends everything.",
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center mb-8 sm:mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Your result</p>
        <h1
          className={`text-5xl sm:text-6xl font-black bg-gradient-to-r ${info.color} bg-clip-text text-transparent mb-3`}
        >
          {gameData.result}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
          {resultMessages[gameData.result]}
        </p>
      </motion.div>

      {caricatureImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-sm mb-8 sm:mb-10"
        >
          <img
            src={caricatureImage}
            alt="Couple caricature"
            className="w-full rounded-3xl shadow-2xl object-cover"
            style={{ maxHeight: '420px', objectPosition: 'top' }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm mb-8"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-5">
            The Couple
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
            {maleImage ? (
              <motion.img
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.45, type: 'spring', stiffness: 200 }}
                src={maleImage}
                alt={gameData.player1Name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-rose-200"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-100 flex items-center justify-center">
                <span className="text-2xl font-black text-rose-400">{gameData.player1Name[0]}</span>
              </div>
            )}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.55, type: 'spring' }}
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500 fill-rose-500" />
            </motion.div>

            {femaleImage ? (
              <motion.img
                initial={{ scale: 0, rotate: 15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.45, type: 'spring', stiffness: 200 }}
                src={femaleImage}
                alt={gameData.player2Name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-pink-200"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-pink-100 flex items-center justify-center">
                <span className="text-2xl font-black text-pink-400">{gameData.player2Name[0]}</span>
              </div>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-center text-xl sm:text-2xl font-bold text-gray-900"
          >
            {gameData.player1Name}{' '}
            <span className="text-rose-400 font-black">&amp;</span>{' '}
            {gameData.player2Name}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center"
          >
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Common</p>
              <p className="text-2xl font-black text-rose-500">{gameData.commonLetters}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Count</p>
              <p className="text-2xl font-black text-orange-500">{gameData.totalCount}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={onReset}
        className="w-full max-w-sm bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 text-base"
      >
        <RotateCcw className="w-5 h-5" />
        Try Another Couple
      </motion.button>
    </div>
  );
}
