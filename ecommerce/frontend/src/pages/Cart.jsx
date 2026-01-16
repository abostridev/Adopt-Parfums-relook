import { useEffect, useState } from "react";
import api from "../api/axios";
import { getMediaUrl } from "../utils/media";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data || []);
      } catch (err) {
        console.error("Erreur chargement panier", err);
        setCart([]);
      }
    };

    loadData();
  }, []);




  const removeItem = async (productId) => {
    try {
      const res = await api.delete(`/cart/remove/${productId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Erreur suppression produit", err);
    }
  };

  const total = Array.isArray(cart)
    ? cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
    : 0;

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement du panier...
      </div>
  );
}


  return (
    <section className="bg-[#FAF7F5] min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Produits */}
        <div className="md:col-span-2 space-y-8">
          <h1 className="text-4xl font-serif mb-8">Votre panier</h1>
          

          {cart.length === 0 ? (
            <p className="text-[#8A8A8A]">Votre panier est vide</p>
          ) : (
            cart.map(item => (
              <div
                key={item.product._id}
                className="flex gap-6 bg-white rounded-2xl p-6 shadow-sm"
              >
                <img
                  src={getMediaUrl(item.product.images?.[0])}
                  alt={item.product.name}
                  className="w-28 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="font-serif text-xl">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-[#8A8A8A] mb-2">
                    {item.product.category}
                  </p>
                  <p className="font-medium">
                    {item.product.price} € × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            ))
          )}
        </div>

        {/* Résumé */}
        <div className="bg-white rounded-2xl p-8 shadow-sm h-fit">
          <h2 className="text-2xl font-serif mb-6">Résumé</h2>

          <div className="flex justify-between mb-4">
            <span>Sous-total</span>
            <span>{total.toFixed(2)} €</span>
          </div>

          <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{total.toFixed(2)} €</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            disabled={cart.length === 0}
            className="mt-8 w-full bg-black text-white py-4 rounded-full hover:scale-105 transition disabled:opacity-50"
          >
            Commander
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
