import { motion } from "framer-motion";

const PerfumeMistLoader = ({ text = "Diffusion de la fragrance…" }) => {
  return (
    <div className=" flex flex-col items-center justify-center bg-background overflow-hidden">

      {/* Flacon stylisé */}
      <div className="w-14 h-20 border border-black/40 rounded-b-2xl rounded-t-md relative mb-10">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-3 border border-black/40 rounded-sm" />
      </div>

      {/* Brume */}
      <motion.div
        className="absolute bottom-[45%] flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-2 h-16 bg-black/10 rounded-full"
            animate={{
              y: [-10, -40],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Texte */}
      <motion.p
        className="mt-24 font-serif text-lg tracking-wide text-black/80"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default PerfumeMistLoader;
