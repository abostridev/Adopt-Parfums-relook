import { motion } from "framer-motion";

const AppLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F5] flex flex-col items-center justify-center">
      <motion.h1
        className="font-serif text-4xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Adopt
      </motion.h1>

      <motion.div
        className="w-12 h-12 rounded-full border border-black/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default AppLoader;
