import { motion } from "framer-motion";

const PerfumeMistLoader = ({ text = "Diffusion de la fragrance…" }) => {
  return (
    <div className="w-screen h-fit py-50 flex flex-col items-center justify-center bg-transparent">
      
      {/* Conteneur du flacon + brume */}
      <div className="relative flex flex-col items-center">
        
        {/* La brume */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="w-2 h-12 bg-slate-400/50 rounded-full blur-[2px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                y: [10, -50],
                opacity: [0, 0.8, 0],
                scale: [1, 1.8],
              }}
              transition={{
                duration: 2.2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Flacon stylisé */}
        <div className="w-14 h-20 border-2 border-black/60 rounded-b-2xl rounded-t-md relative bg-white/10">
          {/* Bouchon du flacon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-4 border-2 border-black/60 rounded-sm bg-white" />
        </div>
      </div>

      {/* Texte  */}
      <motion.p
        className="mt-12 font-serif text-lg tracking-wide text-black/80 text-center w-full px-4"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default PerfumeMistLoader;
