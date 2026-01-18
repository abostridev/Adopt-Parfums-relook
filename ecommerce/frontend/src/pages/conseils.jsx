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
    <section className="bg-[#FAF7F5] min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <video
          src="/video/parfum.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-6"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-6">Conseils & Astuces</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Sublimez votre signature olfactive</h1>
          <p className="max-w-xl mx-auto text-white/80 text-lg">
            Découvrez nos conseils pour choisir, porter et faire durer votre parfum au quotidien.
          </p>
        </motion.div>
      </div>

      {/* INTRO TEXT */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center py-20 px-6"
      >
        <p className="text-[#8A8A8A] text-lg leading-relaxed font-serif italic">
          "Le parfum est une émotion invisible. Nos experts partagent avec vous les gestes essentiels pour révéler pleinement votre fragrance."
        </p>
      </motion.div>

      {/* LISTE DES CONSEILS */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading && <p className="text-center text-[#8A8A8A]">Chargement des conseils…</p>}
        
        {!loading && advices.length === 0 && (
          <p className="text-center text-[#8A8A8A]">Aucun conseil disponible pour le moment.</p>
        )}

        <div className="space-y-32">
          {advices.map((advice, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <motion.section
                key={advice._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row ${isReverse ? "md:flex-row-reverse" : ""} w-full md:max-w-6xl mx-auto items-stretch`}
              >
                {/* BLOC TEXTE */}
                <div 
                  className={`md:w-1/2 bg-[#F1F5F4] border border-gray-400 flex flex-col justify-center
                    /* Mobile: Arrondi Haut */
                    rounded-t-3xl border-b-0 
                    /* Desktop: Arrondi s'adapte au reverse */
                    ${isReverse 
                      ? "md:rounded-r-3xl md:rounded-l-none md:border-l-0" 
                      : "md:rounded-l-3xl md:rounded-r-none md:border-r-0"} 
                    md:border-b-1`}
                >
                  <div className="md:px-16 px-8 py-12 md:text-start text-center">
                    <h3 className="font-serif md:text-4xl text-2xl md:mb-6 mb-4 leading-tight text-gray-900">
                      {advice.title}
                    </h3>
                    <p className="text-gray-600 md:text-lg text-base leading-relaxed">
                      {advice.description}
                    </p>
                  </div>
                </div>

                {/* BLOC VIDÉO */}
                <div 
                  className={`md:w-1/2 w-full p-4 border border-gray-400 flex items-center justify-center bg-white
                    rounded-b-3xl 
                    ${isReverse 
                      ? "md:rounded-l-3xl md:rounded-r-none" 
                      : "md:rounded-r-3xl md:rounded-l-none"}
                    md:border-t-1`}
                >
                  <div className="w-full h-full overflow-hidden  ">
                    {advice.video && (
                      <AdviceVideo src={getMediaUrl(advice.video)} />
                    )}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="bg-white py-20 text-center border-t border-gray-100">
        <h2 className="font-serif text-4xl mb-6">Prêt à trouver votre parfum ?</h2>
        <Link
          to="/"
          className="inline-block bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all hover:scale-105"
        >
          Explorer la collection
        </Link>
      </div>
    </section>
  );
};

export default Conseils;
