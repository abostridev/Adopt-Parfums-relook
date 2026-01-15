import { motion } from "framer-motion";

const PremiumLoader = ({ text = "Chargement…" }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAF7F5]">
      
      {/* Cercle animé */}
      <motion.div
        className="w-16 h-16 rounded-full border border-black/30 relative"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full" />
      </motion.div>

      {/* Texte */}
      <motion.p
        className="mt-8 font-serif text-lg text-black/80 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.p>

    </div>
  );
};

export default PremiumLoader;
