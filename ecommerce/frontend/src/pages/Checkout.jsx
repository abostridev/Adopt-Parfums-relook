import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    };

    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const confirmOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await api.post(
        "/orders",
        { shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAF7F5] min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm">

        <h1 className="text-4xl font-serif mb-10 text-center">
          Finaliser votre commande
        </h1>

        {/* 🧾 Récap panier */}
        <div className="space-y-6 mb-12">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <p className="font-serif">
                  {item.product.name}
                </p>
                <p className="text-sm text-[#8A8A8A]">
                  Quantité : {item.quantity}
                </p>
              </div>
              <span>
                {(item.product.price * item.quantity).toFixed(2)} €
              </span>
            </div>
          ))}
        </div>

        {/* 💰 Total */}
        <div className="flex justify-between text-xl font-semibold mb-14">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>

        {/* 🚚 Adresse de livraison */}
        <h2 className="text-2xl font-serif mb-6">
          Adresse de livraison
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="fullName"
            placeholder="Nom complet"
            value={shippingAddress.fullName}
            onChange={handleChange}
            className="border p-4 rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={shippingAddress.phone}
            onChange={handleChange}
            className="border p-4 rounded-lg"
          />

          <input
            type="text"
            name="city"
            placeholder="Ville"
            value={shippingAddress.city}
            onChange={handleChange}
            className="border p-4 rounded-lg"
          />

          <input
            type="text"
            name="country"
            placeholder="Pays"
            value={shippingAddress.country}
            onChange={handleChange}
            className="border p-4 rounded-lg"
          />
        </div>

        <textarea
          name="address"
          placeholder="Adresse complète"
          value={shippingAddress.address}
          onChange={handleChange}
          rows="3"
          className="border p-4 rounded-lg w-full mb-10"
        />

        {/* ℹ️ Message rassurant */}
        <p className="text-sm text-center text-[#8A8A8A] mb-8">
          Aucun paiement requis pour le moment.  
          Vous pourrez finaliser plus tard.
        </p>

        {/* ✅ CTA */}
        <button
          onClick={confirmOrder}
          disabled={loading || cart.length === 0}
          className="w-full bg-black text-white py-4 rounded-full hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Commande en cours..." : "Confirmer la commande"}
        </button>

      </div>
    </section>
  );
};

export default Checkout;
