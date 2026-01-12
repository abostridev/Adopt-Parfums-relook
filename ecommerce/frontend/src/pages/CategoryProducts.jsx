import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const PRODUCTS_PER_PAGE = 6;

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/category/${category}`);
        setProducts(res.data);
        setCurrentPage(1); // reset page quand on change de catégorie
      } catch (error) {
        console.error("Erreur chargement produits :", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const displayedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <section className="bg-[#FAF7F5] min-h-screen">

      {/* HERO */}
      <div className="relative py-20 px-4 border-b md:border-[#E8E5E2] border-black/60 ">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-xs tracking-[0.3em] text-secondary uppercase mb-6">
            Collection
          </p>

          <h1 className="font-serif text-5xl md:text-6xl capitalize mb-6">
            Parfums {category}
          </h1>

          <p className="text-[#8A8A8A] text-lg leading-relaxed">
            Une sélection de fragrances raffinées, pensées pour sublimer
            chaque instant et révéler votre signature olfactive.
          </p>

          <div className="mt-10 flex justify-center">
            <span className="h-px w-24 bg-[#1F1F1F] opacity-40"></span>
          </div>
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-7xl mx-auto py-14 px-4">

        {loading && (
          <p className="text-center text-[#8A8A8A]">
            Chargement des parfums…
          </p>
        )}

        {!loading && displayedProducts.length === 0 && (
          <p className="text-center text-[#8A8A8A]">
            Aucun parfum disponible dans cette collection.
          </p>
        )}

        {!loading && displayedProducts.length > 0 && (
          <>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {displayedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 0 && (
              <div className="flex justify-center items-center gap-6 mt-20">

                <button
                  onClick={() => setCurrentPage(p => p - 1)}
                  disabled={currentPage === 1}
                  className="text-sm tracking-wide disabled:opacity-30 hover:text-secondary transition"
                >
                  ← Précédent
                </button>

                <span className="text-sm text-[#8A8A8A]">
                  Page {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={currentPage === totalPages}
                  className="text-sm tracking-wide disabled:opacity-30 hover:text-secondary transition"
                >
                  Suivant →
                </button>

              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
