import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AdviceVideo from "../components/AdviceVideo";
import { getMediaUrl } from "../utils/media";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Conseils = () => {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvices = async () => {
      try {
        const res = await api.get("/advices");
        setAdvices(res.data);
      } catch {
        setAdvices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvices();
  }, []);

  return (
    <motion.section
  key={advice._id}
  className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} w-full md:max-w-6xl mx-auto gap-0`}
>
  {/* BLOC TEXTE */}
  <div className={`md:w-1/2 bg-teal-50 border border-gray-500 flex flex-col justify-center
    /* Arrondis Mobiles */
    rounded-t-2xl border-b-0 
    /* Arrondis Desktop : s'adaptent selon le mode reverse */
    ${reverse 
      ? "md:rounded-r-2xl md:rounded-l-none md:border-l-0" 
      : "md:rounded-l-2xl md:rounded-r-none md:border-r-0"} 
    md:border-b-1`}
  >
    <div className="md:px-16 px-6 py-10 md:text-start text-center">
      <h3 className="font-serif md:text-4xl text-2xl md:mb-6 mb-2 leading-tight">
        {advice.title}
      </h3>
      <p className="text-[#6F6F6F] md:text-lg text-base leading-relaxed">
        {advice.description}
      </p>
    </div>
  </div>

  {/* BLOC VIDÉO */}
  <div className={`md:w-1/2 w-full p-4 border border-gray-500
    /* Arrondis Mobiles */
    rounded-b-2xl 
    /* Arrondis Desktop : s'adaptent selon le mode reverse */
    ${reverse 
      ? "md:rounded-l-2xl md:rounded-r-none" 
      : "md:rounded-r-2xl md:rounded-l-none"}
    md:border-t-1`}
  >
    <div className="rounded-xl overflow-hidden shadow-sm">
      {advice.video && (
        <AdviceVideo src={getMediaUrl(advice.video)} />
      )}
    </div>
  </div>
</motion.section>

  );
};

export default Conseils;
