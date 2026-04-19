import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FemaleIntroPageProps {
  femaleName: string;
  femaleImage: string;
  onComplete: () => void;
}

export default function FemaleIntroPage({ femaleName, femaleImage, onComplete }: FemaleIntroPageProps) {
  const ref = useRef(onComplete);
  ref.current = onComplete;

  useEffect(() => {
    const t = setTimeout(() => ref.current(), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundImage: "url('/bgs/background3.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: 'Neucha, cursive' }}
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between w-full px-4 sm:px-8 pt-2 sm:pt-4">
          <img src="/bgs/logo1.png" alt="Logo" className="h-14 sm:h-18 object-contain" />
          <img src="/bgs/logo2.png" alt="Logo" className="h-14 sm:h-18 object-contain" />
        </div>

        <div className="flex-1 flex flex-col items-center pt-8 sm:pt-12 px-6 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontFamily: 'Neucha, cursive' }}
            className="text-3xl sm:text-5xl font-bold text-[#650000] drop-shadow-2xl text-center leading-tight"
          >
            Ek ladki thi…
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="relative"
          >
            <div className="w-80 h-[480px] sm:w-[320px] sm:h-[480px] rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <img src={femaleImage} alt={femaleName} className="w-full h-full object-cover object-top" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-md px-8 py-3 rounded-full border border-white/40 shadow-xl"
            >
              <span style={{ fontFamily: 'Neucha, cursive' }} className="text-3xl sm:text-4xl font-bold text-[#650000] drop-shadow">
                {femaleName}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
