import { useEffect, useState, useCallback } from "react";
import api from "../../api/axios";
import { getMediaUrl } from "../../utils/media";
import ProductForm from "./ProductForm";
import { Pencil, Trash2, Star } from "lucide-react";
import AdminProductsSkeleton from "../../components/admin/AdminProductsSkeleton";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
  setLoading(true);
  const res = await api.get("/admin/products", {
    params: {
      page,
      limit: 8,
      search,
    },
  });

  setProducts(res.data.products);
  setPages(res.data.pages);
  setLoading(false);
}, [page, search]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    if (!confirm("Supprimer ce produit définitivement ?")) return;
    await api.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-row sm:justify-between sm:items-center gap-24 sm:gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif">Produits</h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-black text-white  px-2.5 sm:px-6 py-3 rounded-full text-sm  "
        >
          + Ajouter un produit
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-6 w-full sm:max-w-sm px-5 py-3 rounded-full border text-sm"
      />

      {/* TABLE */}
      {loading ? (
  <AdminProductsSkeleton />
) : (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FAF7F5] text-[#8A8A8A]">
            <tr>
              <th className="p-4 text-left">Produit</th>
              <th className="hidden sm:table-cell text-center">Prix</th>
              <th className="hidden md:table-cell text-center">Stock</th>
              <th className="hidden lg:table-cell text-center">Catégorie</th>
              <th className="text-center">État</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-[#FAF7F5]/40 transition"
              >
                {/* PRODUIT */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={getMediaUrl(p.images?.[0])}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div className="min-w-0">
                    <p className="font-medium truncate flex items-center gap-2">
                      {p.name}
                      {p.isFeatured && (
                        <Star size={14} className="text-secondary" />
                      )}
                    </p>
                    {p.oldPrice && (
                      <span className="text-xs text-secondary">
                        En promotion
                      </span>
                    )}
                  </div>
                </td>

                {/* PRIX */}
                <td className="hidden sm:table-cell text-center">
                  {p.price} €
                </td>

                {/* STOCK */}
                <td className="hidden md:table-cell text-center">
                  {p.stock === 0 ? (
                    <span className="text-red-500">Rupture</span>
                  ) : p.stock <= 5 ? (
                    <span className="text-orange-500">{p.stock}</span>
                  ) : (
                    p.stock
                  )}
                </td>

                {/* CAT */}
                <td className="hidden lg:table-cell text-center capitalize">
                  {p.category}
                </td>

                {/* ACTIVE */}
                <td className="text-center">
                  <button
                    onClick={async () => {
                      await api.put(`/admin/products/${p._id}`, {
                        isActive: !p.isActive,
                      });
                      fetchProducts();
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {p.isActive ? "Actif" : "Inactif"}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setShowForm(true);
                    }}
                    className="text-secondary"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {pages > 1 && (
          <div className="flex justify-center items-center gap-2 py-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-2 text-sm border rounded-full disabled:opacity-40"
            >
              ←
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-full text-sm ${
                  page === i + 1
                    ? "bg-black text-white"
                    : "border hover:bg-[#FAF7F5]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-2 text-sm border rounded-full disabled:opacity-40"
            >
              →
            </button>
          </div>
        )}
      </div>)}

      {/* MODAL */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-2xl relative"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-2xl font-serif ">
              {editingProduct ? "Modifier le produit" : "Nouveau produit"}
            </h2>

            <ProductForm
              product={editingProduct}
              onSaved={() => {
                fetchProducts();
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProducts;
