import { useEffect, useState } from "react";
import api from "../api/axios";
import { getMediaUrl } from "../utils/media";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");
      setProducts(res.data.filter(p => p.isFeatured));
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 px-4 bg-[#EFE7E2] border-t-8 border-b border-[#E3D3C8]">
      <div className="max-w-7xl mx-auto">

        {/* Titre */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1F1F1F] mb-3">
            Sélection Signature
          </h2>
          <p className="text-[#5F8F7E] text-sm tracking-wide uppercase">
            L’essence de la maison Adopt
          </p>
        </div>

        {/* Grid premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(product => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              {/* Image */}
              <img
                src={getMediaUrl(product.images?.[0])}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Contenu */}
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-widest mb-1 text-[#F3D6C6]">
                  {product.category}
                </p>

                <h3 className="text-2xl font-serif leading-tight mb-2">
                  {product.name}
                </h3>

                <p className="text-lg font-medium">
                  {product.price} €
                </p>

                <span className="inline-block mt-3 text-sm text-[#F3D6C6] opacity-100 md:opacity-0 group-hover:opacity-100 transition">
                  Découvrir →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
