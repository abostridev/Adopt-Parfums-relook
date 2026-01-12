import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AdviceVideo from "../components/AdviceVideo";

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

      {/* HERO */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <video
          src="/video/parfum.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 " />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-6"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-6">
            Conseils & Astuces
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Sublimez votre signature olfactive
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-lg">
            Découvrez nos conseils pour choisir, porter et faire durer
            votre parfum au quotidien.
          </p>
        </motion.div>
      </div>

      {/* INTRO */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center py-20 px-6 "
      >
        <p className="text-[#8A8A8A] text-lg leading-relaxed">
          Le parfum est une émotion invisible. Nos experts partagent avec vous
          les gestes essentiels pour révéler pleinement votre fragrance et
          créer une expérience sensorielle unique.
        </p>
      </motion.div>

      {/* CONSEILS */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading && (
          <p className="text-center text-[#8A8A8A]">
            Chargement des conseils…
          </p>
        )}

        {!loading && advices.length === 0 && (
          <p className="text-center text-[#8A8A8A]">
            Aucun conseil disponible pour le moment.
          </p>
        )}

        <div className="space-y-32">
          {advices.map((advice, index) => {
            const reverse = index % 2 !== 0;

            return (
              <motion.section
                key={advice._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} w-full md:max-w-6xl md:max-h-2xl mx-auto  border-gray-500 
           gap-0  `}
              >

                {/* TEXTE */}
                <div className="md:w-1/2  bg-teal-50 items-center border border-gray-500 rounded-t-2xl  md:rounded-l-2xl md:border-r-0 border-b-0 md:border-b-1 md:rounded-tr-none">
                  <div className="md:px-15 px-4 py-4 md:py-0 md:text-start text-center  flex flex-col justify-center h-full ">
                    <h3 className="font-serif md:text-4xl text-2xl md:mb-6 mb-2 pt-4 leading-tight">
                      {advice.title}
                    </h3>

                    <p className="text-[#6F6F6F] md:text-lg text-base  leading-relaxed">
                      {advice.description}
                    </p>
                  </div>
                </div>


                {/* VIDÉO */}
                <div className="md:w-1/2 w-full md:py-5 py-3 px-3 md:px-0 border border-gray-500 md:rounded-r-2xl md:border-l-0  rounded-b-2xl md:rounded-bl-none border-t-0 md:border-t-1  ">
                  {advice.video && (
                    <AdviceVideo
                      src={`${import.meta.env.VITE_API_URL}${advice.video}`}
                    />
                  )}
                </div>
              </motion.section>
            );
          })}
        </div>


      </div>

      {/* CTA */}
      <div className="bg-white py-20 text-center">
        <h2 className="font-serif text-4xl mb-6">
          Prêt à trouver votre parfum ?
        </h2>
        <Link
          to="/"
          className="inline-block bg-black text-white px-10 py-4 rounded-full hover:scale-105 transition"
        >
          Explorer la collection
        </Link>
      </div>
    </section>
  );
};

export default Conseils;
