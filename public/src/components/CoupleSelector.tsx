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
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-14"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-rose-500 fill-rose-500" />
          <h1 className="text-4xl sm:text-5xl font-black tracking-widest text-gray-900">FLAMES</h1>
          <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-rose-500 fill-rose-500" />
        </div>
        <p className="text-base sm:text-lg text-gray-500 font-medium">
          Discover your relationship destiny
        </p>
      </motion.div>

      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-gray-500">
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
          className="w-full max-w-lg flex flex-col gap-4"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-2">
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
              className="group relative w-full bg-white rounded-2xl shadow-md hover:shadow-xl border border-rose-100 hover:border-rose-300 transition-all duration-200 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4 p-5">
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
                  <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{couple.coupleName}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {couple.maleName} &amp; {couple.femaleName}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {selecting === couple.coupleId ? (
                    <Loader2 className="w-5 h-5 text-rose-400 animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-rose-400 transition-colors" />
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-rose-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
