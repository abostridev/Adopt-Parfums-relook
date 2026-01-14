import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { getMediaUrl } from "../utils/media";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH PRODUIT + SIMILAIRES
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productRes = await api.get(`/products/${id}`);
        const currentProduct = productRes.data;
        setProduct(currentProduct);

        // Produits similaires (même catégorie)
        const similarRes = await api.get(
          `/products/category/${currentProduct.category}`
        );

        const filtered = similarRes.data.filter(
          (p) => p._id !== currentProduct._id
        );

        setSimilarProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Chargement…</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Produit introuvable</p>;
  }

  /* =========================
     QUANTITÉ
  ========================= */
  const increase = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  /* =========================
     AJOUT PANIER
  ========================= */
  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity,
      });

      navigate("/cart");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", { state: { from: `/product/${id}` } });
      } else {
        alert("Erreur lors de l'ajout au panier.");
      }
    }
  };


  return (
    <section className="bg-[#FAF7F5] py-12 md:py-20 px-4 space-y-24">

      {/* =========================
          HERO PRODUIT
      ========================= */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <img
            src={getMediaUrl(product.images?.[0])}
            alt={product.name}
            className="w-full h-[460px] md:h-[560px] object-cover"
          />
          <span className="absolute top-6 left-6 bg-black/70 text-white text-xs px-4 py-1 rounded-full tracking-widest capitalize">
            {product.category}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          {product.isFeatured && (
            <p className="text-secondary text-sm tracking-widest mb-2">
              ✦ SÉLECTION VEDETTE
            </p>
          )}

          <h1 className="text-5xl font-serif mb-4">{product.name}</h1>

          <p className="italic text-secondary text-xl mb-6">
            Une fragrance qui révèle votre signature.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-semibold">{product.price} €</span>
            {product.price && product.oldPrice && (<>
              <span className="text-3xl font-semibold">{product.price} €</span>
              <span className="line-through text-[#8A8A8A]">
                {product.oldPrice} €
              </span></>
            )}
          </div>

          <p className="leading-relaxed mb-8">{product.description}</p>

          <p className="mb-6">
            {product.stock > 5 && (
              <span className="text-secondary">En stock</span>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="text-orange-500">
                Plus que {product.stock} en stock
              </span>
            )}
            {product.stock === 0 && (
              <span className="text-red-500">Rupture de stock</span>
            )}
          </p>

          {product.stock > 0 && (
            <div className="flex items-center gap-6 mb-10">
              <span className="text-sm text-[#8A8A8A] font-semibold">
                Quantité :
              </span>
              <div className="flex items-center border rounded-full px-4 py-2">
                <button onClick={decrease} className="px-3 text-xl">−</button>
                <span className="px-4">{quantity}</span>
                <button onClick={increase} className="px-3 text-xl">+</button>
              </div>
            </div>
          )}

          <button
            onClick={addToCart}
            disabled={product.stock === 0}
            className="bg-black text-white py-4 px-10 rounded-full w-fit hover:scale-105 transition disabled:opacity-50"
          >
            Ajouter au panier
          </button>
        </div>
      </div>


      {/* =========================
    CONSEIL PARFUM
========================= */}
      <div className=" max-w-4xl mx-auto text-center bg-white rounded-3xl p-12 shadow-md">
        <p className="text-xs tracking-[0.35em] uppercase text-secondary mb-4">
          Le conseil du parfumeur
        </p>

        <h3 className="font-serif text-2xl mb-4">
          Sublimez votre fragrance
        </h3>

        <p className="text-lg leading-relaxed text-[#1F1F1F]">
          Appliquez votre parfum sur les points de pulsation :
          le cou, les poignets et derrière les oreilles.
          Pour une tenue optimale, vaporisez sur une peau
          propre et légèrement hydratée.
        </p>

        <p className="mt-4 text-sm text-[#8A8A8A] italic">
          Astuce : ne frottez jamais vos poignets après application.
        </p>

        <Link
          to="/conseils"
          className="inline-block mt-8 text-sm font-semibold tracking-wide border-b border-black text-secondary hover:border-secondary transition"
        >
          Découvrir tous nos conseils →
        </Link>
      </div>


      {/* =========================
          PRODUITS SIMILAIRES
      ========================= */}
      {similarProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl mb-10 text-center">
            Vous aimerez aussi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {similarProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
