import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface StoryPageProps {
  onComplete: () => void;
}

const LINES = [
  'Dono yahi kehte the,',
  '"Arey, kuch bhi nahi hai.." 😇🤭',
  'Par ab dil ki kahani ❤️',
  'Chhup nahi paayegi… 🤫❌',
  'Aaj har baat sabke',
  'Saamne aa jaayegi..! 😜🎉✨',
  'So get ready, friends 🤩🎊',
  "To know the truth that's about to unfold! 🔥😆💫",
];

const LINE_DELAY = 0.65;
const TOTAL_MS = (LINES.length * LINE_DELAY + 3.5) * 1000;

export default function StoryPage({ onComplete }: StoryPageProps) {
  const ref = useRef(onComplete);
  ref.current = onComplete;

  useEffect(() => {
    const t = setTimeout(() => ref.current(), TOTAL_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundImage: "url('/bgs/background3.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full h-full flex flex-col" style={{ background: 'rgba(0,0,0,0.55)' }}>
        <div className="flex items-center justify-between w-full px-4 sm:px-8 pt-4 sm:pt-5">
          <img src="/bgs/logo1.png" alt="Logo" className="h-12 sm:h-14 object-contain" />
          <img src="/bgs/logo2.png" alt="Logo" className="h-12 sm:h-14 object-contain" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-4">
          <div className="max-w-lg w-full text-center space-y-2 sm:space-y-3">
            {LINES.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * LINE_DELAY + 0.3, duration: 0.55 }}
                style={{ fontFamily: 'Caveat, cursive' }}
                className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-lg leading-snug"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
