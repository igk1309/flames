import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface InputSectionProps {
  onStartAnimation: (player1: string, player2: string) => void;
  defaultMaleName?: string;
  defaultFemaleName?: string;
}

export default function InputSection({
  onStartAnimation,
  defaultMaleName = '',
  defaultFemaleName = '',
}: InputSectionProps) {
  const [maleName, setMaleName] = useState(defaultMaleName);
  const [femaleName, setFemaleName] = useState(defaultFemaleName);
  const [error, setError] = useState('');

  const isValid = maleName.trim().length > 0 && femaleName.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) {
      setError('Please enter both names');
      return;
    }
    setError('');
    onStartAnimation(maleName.trim(), femaleName.trim());
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4"
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">FLAMES</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">Confirm the names to reveal your fate</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              His Name
            </label>
            <input
              type="text"
              value={maleName}
              onChange={(e) => { setMaleName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none text-gray-900 text-base font-medium transition-colors placeholder:text-gray-300"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Her Name
            </label>
            <input
              type="text"
              value={femaleName}
              onChange={(e) => { setFemaleName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none text-gray-900 text-base font-medium transition-colors placeholder:text-gray-300"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-500 text-sm text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
              isValid
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-200 hover:shadow-rose-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Calculate FLAMES
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
