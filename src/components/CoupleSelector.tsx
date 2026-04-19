import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { loadCouples, type CoupleDataWithImages } from '../utils/dataLoader';

interface CoupleSelectorProps {
  onCoupleSelect: (couple: CoupleDataWithImages) => void;
}

export default function CoupleSelector({ onCoupleSelect }: CoupleSelectorProps) {
  const [couples, setCouples] = useState<CoupleDataWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selecting, setSelecting] = useState<string | null>(null);

  useEffect(() => {
    loadCouples(true)
      .then((data) => {
        setCouples(data);
        if (data.length === 0) setError('No couples found.');
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load couples'))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (couple: CoupleDataWithImages) => {
    if (selecting) return;
    setSelecting(couple.coupleId);
    onCoupleSelect(couple);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center px-4 py-10 sm:py-16"
      style={{ 
        backgroundImage: "url('/bgs/Background.jpeg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: 'Neucha, cursive'
      }}
    >

      
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
      <motion.div

        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-14"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-rose-500 fill-rose-500" />
          <h1 className="text-4xl sm:text-5xl font-black tracking-widest text-[#650000] drop-shadow-lg">FLAMES</h1>
          <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-rose-500 fill-rose-500 drop-shadow" />
        </div>
        <p className="text-base sm:text-lg text-rose-100 font-medium drop-shadow">
          Discover your relationship destiny
        </p>
      </motion.div>

      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-[#650000]">
          <Loader2 className="w-5 h-5 animate-spin text-rose-400" />
          <span className="text-sm font-medium">Loading couples...</span>
        </motion.div>
      )}

      {!loading && error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </motion.div>
      )}

      {!loading && couples.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-lg flex flex-col gap-4 w-full"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-200 text-center mb-2 drop-shadow">
            Select a couple
          </p>
          {couples.map((couple, i) => (
            <motion.button
              key={couple.coupleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(couple)}
              disabled={!!selecting}
              className="group relative w-full rounded-2xl shadow-lg border border-white/20 hover:border-white/40 transition-all duration-200 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-md">
                <div className="flex -space-x-3 flex-shrink-0">
                  {couple.maleImageUrl && (
                    <img
                      src={couple.maleImageUrl}
                      alt={couple.maleName}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow ring-2 ring-rose-200"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                  {couple.femaleImageUrl && (
                    <img
                      src={couple.femaleImageUrl}
                      alt={couple.femaleName}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow ring-2 ring-pink-200"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-[#650000] drop-shadow truncate">{couple.coupleName}</p>
                  <p className="text-sm text-[#650000]/80 truncate">
                    {couple.maleName} &amp; {couple.femaleName}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {selecting === couple.coupleId ? (
                    <Loader2 className="w-5 h-5 text-rose-400 animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-rose-400 transition-colors" />
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-rose-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </motion.div>
      )}
      </div>
    </div>
  );
}
