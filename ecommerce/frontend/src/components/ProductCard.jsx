import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block"
    >
      <article className="relative bg-[#FAF7F5] border border-[#E8E5E2] rounded-3xl overflow-hidden transition hover:shadow-xl">

        {/* IMAGE */}
        <div className="relative h-[320px]  flex items-center justify-center">
          <img
            src={`${API_URL}${product.images[0]}`}
            alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* BADGE PROMO */}
          {product.oldPrice && (
            <span className="absolute top-4 right-4 bg-black text-white text-xs tracking-widest px-4 py-1 rounded-full">
              PROMO
            </span>
          )}

          {/* BADGE STOCK */}
          {product.stock === 0 && (
            <span className="absolute bottom-4 left-4 bg-[#1F1F1F] text-white text-xs px-4 py-1 rounded-full">
              Rupture de stock
            </span>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <span className="absolute bottom-4 left-4 bg-[#5F8F7E] text-white text-xs px-4 py-1 rounded-full">
              Stock limité
            </span>
          )}
        </div>

        {/* CONTENU */}
        <div className="p-6 space-y-4">

          {/* NOM */}
          <h3 className="font-serif text-xl text-[#1F1F1F] leading-tight">
            {product.name}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-muted line-clamp-2">
            {product.description}
          </p>

          {/* PRIX */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-text">
              {product.price} €
            </span>

            {product.oldPrice && (
              <span className="text-sm text-muted line-through">
                {product.oldPrice} €
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide lg:text-text border-b border-text text-secondary  group-hover:text-secondary group-hover:border-secondary transition">
              Découvrir le parfum
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
