import { motion } from 'framer-motion';

export default function AdPage() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundImage: "url('/bgs/Background.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm sm:max-w-lg rounded-2xl overflow-hidden shadow-2xl border-4 border-white shadow-2xl"
          >
            <img src="/bgs/ad.jpeg" alt="Advertisement" className="w-full h-auto object-contain" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full text-center py-4 border-t border-white/30 px-4 mb-4"
        >
          <div className="mb-4 text-center">
            <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-lg sm:text-xl font-black text-[#650000] drop-shadow-lg uppercase tracking-tight">
              ROHIT ROMA GOEL
            </p>
            <p className="text-[10px] sm:text-xs font-bold text-[#650000]/90 tracking-wide mt-0.5">
              GREETINGS CAPTAIN
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
            <div className="text-center">
              <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-sm sm:text-lg font-black text-[#650000] uppercase tracking-tight">
                RAJESH RANKA
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-[#650000]/80 uppercase">
                School Captain
              </p>
            </div>
            <div className="text-center">
              <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-sm sm:text-lg font-black text-[#650000] uppercase tracking-tight">
                RAKESH LALWANI
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-[#650000]/80 uppercase">
                Assistant Captain
              </p>
            </div>
            <div className="text-center">
              <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-sm sm:text-lg font-black text-[#650000] uppercase tracking-tight">
                VINOD KOTHARI
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-[#650000]/80 uppercase">
                Treasuery Captain
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
