import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/index.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const { fetchOrders } = useOrders();

  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const navigate = useNavigate();

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
      if (!isValidPhoneNumber(shippingAddress.phone || "")) {
        alert("Veuillez entrer un numéro de téléphone valide");
        return;
      }

      setLoading(true);

      await api.post("/orders", { shippingAddress });

      // 🔁 SYNC GLOBAL
      await fetchOrders();
      await fetchCart();

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

        {/* 🧾 PANIER */}
        <div className="space-y-6 mb-12">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <p className="font-serif">{item.product.name}</p>
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

        {/* 💰 TOTAL */}
        <div className="flex justify-between text-xl font-semibold mb-14">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>

        {/* 🚚 ADRESSE */}
        <h2 className="text-2xl font-serif mb-6">
          Adresse de livraison
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input name="fullName" placeholder="Nom complet" onChange={handleChange} className="border p-4 rounded-lg" />
          <div className="flex flex-col gap-1">
            <PhoneInput
              international
              defaultCountry="TG"
              value={shippingAddress.phone}
              onChange={(value) =>
                setShippingAddress({ ...shippingAddress, phone: value })
              }
              placeholder="Numéro de téléphone"
              className="phone-input"
            />

            {shippingAddress.phone &&
              !isValidPhoneNumber(shippingAddress.phone) && (
                <span className="text-xs text-red-500">
                  Numéro de téléphone invalide
                </span>
              )}
          </div>

          <input name="city" placeholder="Ville" onChange={handleChange} className="border p-4 rounded-lg" />
          <input name="country" placeholder="Pays" onChange={handleChange} className="border p-4 rounded-lg" />
        </div>

        <textarea
          name="address"
          placeholder="Adresse complète"
          rows="3"
          onChange={handleChange}
          className="border p-4 rounded-lg w-full mb-10"
        />

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
