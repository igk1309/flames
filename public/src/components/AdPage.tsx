import { motion } from 'framer-motion';

export default function AdPage() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundImage: "url('/bgs/Background.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full h-full flex flex-col" style={{ background: 'rgba(0,0,0,0.45)' }}>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-white/25"
          >
            <img src="/bgs/Ad.png" alt="Advertisement" className="w-full object-contain" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full text-center py-4 border-t border-white/20 px-4"
        >
          <p style={{ fontFamily: 'Caveat, cursive' }} className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
            Rohit Roma Goel &nbsp;·&nbsp; Greetings Captain
          </p>
          <p style={{ fontFamily: 'Caveat, cursive' }} className="text-sm sm:text-base text-white/80 leading-relaxed mt-0.5">
            Rajesh Ranka · School Captain &nbsp;|&nbsp; Rakesh Lalwani · Assistant School Captain &nbsp;|&nbsp; Vinod Kothari · Treasuery Captain
          </p>
        </motion.div>
      </div>
    </div>
  );
}
