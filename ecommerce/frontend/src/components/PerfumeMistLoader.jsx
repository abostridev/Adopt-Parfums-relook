import { motion } from "framer-motion";

const PerfumeMistLoader = ({ text = "Diffusion de la fragrance…" }) => {
  return (
    // h-fit supprime l'espace vide en bas
    <div className="h-fit py-10 flex flex-col items-center justify-center bg-transparent relative">

      {/* Flacon stylisé */}
      <div className="w-14 h-20 border-2 border-black/40 rounded-b-2xl rounded-t-md relative mb-6">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-4 border-2 border-black/40 rounded-sm bg-background" />
        
        {/* Conteneur de Brume (Placé juste au-dessus du bouchon) */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none z-10">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="w-1.5 h-10 bg-black/20 rounded-full blur-[1px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                y: [20, -40], // Monte vers le haut
                opacity: [0, 0.7, 0], // Apparaît puis disparaît
                scaleX: [1, 1.5, 2], // S'élargit en montant
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Texte */}
      <motion.p
        className="mt-6 font-serif text-lg tracking-wide text-black/80 text-center"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default PerfumeMistLoader;
