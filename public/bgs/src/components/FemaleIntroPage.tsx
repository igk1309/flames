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
    const t = setTimeout(() => ref.current(), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundImage: "url('/bgs/background3.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full h-full flex flex-col" style={{ background: 'rgba(0,0,0,0.45)' }}>
        <div className="flex items-center justify-between w-full px-4 sm:px-8 pt-4 sm:pt-5">
          <img src="/bgs/logo1.png" alt="Logo" className="h-12 sm:h-14 object-contain" />
          <img src="/bgs/logo2.png" alt="Logo" className="h-12 sm:h-14 object-contain" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontFamily: 'Caveat, cursive' }}
            className="text-5xl sm:text-7xl font-bold text-white drop-shadow-2xl text-center leading-tight"
          >
            Ek ladki thi… 👧
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="relative"
          >
            <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white/60 shadow-2xl">
              <img src={femaleImage} alt={femaleName} className="w-full h-full object-cover object-top" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/40"
            >
              <span style={{ fontFamily: 'Caveat, cursive' }} className="text-2xl sm:text-3xl font-bold text-white drop-shadow">
                {femaleName}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
