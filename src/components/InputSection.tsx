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
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 py-10"
      style={{ 
        backgroundImage: "url('/bgs/Background.jpeg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >

      
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4 shadow-xl"
          >
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400 drop-shadow" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F43F5E] tracking-tight drop-shadow-md">FLAMES</h2>
          <p className="text-rose-100 text-sm sm:text-base mt-1 drop-shadow">Confirm the names to reveal your fate</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-rose-100 mb-2 drop-shadow">
              His Name
            </label>
            <input
              type="text"
              value={maleName}
              onChange={(e) => { setMaleName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-white focus:bg-white/30 focus:outline-none text-[#F43F5E] text-base font-medium transition-all placeholder:text-[#F43F5E]/50"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 h-px bg-white/20" />
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-rose-100 mb-2 drop-shadow">
              Her Name
            </label>
            <input
              type="text"
              value={femaleName}
              onChange={(e) => { setFemaleName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-white focus:bg-white/30 focus:outline-none text-[#F43F5E] text-base font-medium transition-all placeholder:text-[#F43F5E]/50"
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
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all border ${
              isValid
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg border-transparent hover:shadow-orange-500/25'
                : 'bg-white/10 text-white/40 cursor-not-allowed border-white/10'
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
