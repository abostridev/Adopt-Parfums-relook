import { useEffect, useState } from "react";
import api from "../../api/axios";

const ProductForm = ({ product, onSaved, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    stock: "",
    category: "",
    isFeatured: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        isFeatured: product.isFeatured,
      });
      setPreview(product.images?.[0]);
    }
  }, [product]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      if (product) {
        await api.put(`/admin/products/${product._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/admin/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onSaved();
    } catch (error) {
      console.error("Erreur upload:", error);
      alert("Erreur: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="py-8">
    <form onSubmit={handleSubmit} className="sm:space-y-6 space-x-4 ">

      {/* NOM */}
      <div>
        <label className="text-sm font-medium">Nom du produit</label>
        <input
          className="w-full mt-1 px-4 py-3 border rounded-xl"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* PRIX */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Prix</label>
          <input
            type="number"
            className="w-full mt-1 px-4 py-3 border rounded-xl"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Prix promo</label>
          <input
            type="number"
            className="w-full mt-1 px-4 py-3 border rounded-xl"
            value={form.oldPrice || ""}
            onChange={(e) =>
              setForm({ ...form, oldPrice: e.target.value })
            }
          />
        </div>
      </div>

      {/* STOCK */}
      <div>
        <label className="text-sm font-medium">Stock</label>
        <input
          type="number"
          className="w-full mt-1 px-4 py-3 border rounded-xl"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
      </div>

      {/* IMAGE */}
      <div>
        <label className="text-sm font-medium">Image du produit</label>

        <div className="flex gap-4 mt-2">
          {preview && (
            <img
              src={preview}
              className="w-24 h-24 rounded-xl object-cover"
            />
          )}

          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="w-24 h-24 rounded-xl object-cover border-2 border-secondary"
            />
          )}
        </div>

        <input
          type="file"
          className="mt-3 bg-amber-200 px-4 py-2 rounded-full font-medium"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* OPTIONS */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) =>
            setForm({ ...form, isFeatured: e.target.checked })
          }
        />
        <span className="text-sm font-medium">
          Mettre ce produit en vedette
        </span>
      </div>


      {/* ACTIONS */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={() => onClose}
          className="px-6 py-3 rounded-full border"
        >
          Annuler
        </button>

        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-black text-white"
        >
          {product ? "Enregistrer" : "Créer"}
        </button>
      </div>
    </form>
    </div>
    
  );
};

export default ProductForm;
