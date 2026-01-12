import { useEffect, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);


  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  const displayedOrders = orders.filter(order =>
    showHistory
      ? order.status === "delivered"
      : order.status !== "delivered"
  );


  return (
    <section className="bg-[#FAF7F5] min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto ">

        <h1 className="text-4xl font-serif mb-12">
          Mes commandes
        </h1>
        <div className="flex items-center justify-between mb-10">
          <p className="text-sm text-[#8A8A8A]">
            {showHistory
              ? "Historique des commandes livrées"
              : "Commandes en cours"}
          </p>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm font-medium border px-5 py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            {showHistory ? "← Commandes en cours" : "Historique →"}
          </button>
        </div>


        {displayedOrders.length === 0 ? (
          <p className="text-[#8A8A8A] mt-10">
            {showHistory
              ? "Aucune commande livrée."
              : "Aucune commande en cours."}
          </p>) : (
          <div className="space-y-12 rounded-3xl">
            {displayedOrders.map(order => (
              <div
                key={order._id}
                className="bg-white rounded-3xl p-10 shadow-sm border-secondary/60 border"
              >

                {/*En-tête commande */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm text-[#8A8A8A]">
                      Commande #{order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-[#8A8A8A]">
                      Passée le{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-medium mt-2">
                      Total : {order.totalPrice.toFixed(2)} €
                    </p>
                  </div>

                  <span
                    className={`text-sm font-semibold px-4 py-1 rounded-full ${order.status === "pending"
                      ? "bg-orange-100 text-orange-600"
                      : order.status === "shipped"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/*Produits */}
                <div className="space-y-3 mb-8">
                  {order.items.map(item => (
                    <div
                      key={item.product}
                      className="flex justify-between text-sm"
                    >
                      <span className="font-title font-semibold">
                        {item.name} ×  {item.quantity}
                      </span>
                      <span>
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>

                {/*Adresse de livraison */}
                {order.shippingAddress && (
                  <div className="border-t pt-6 text-sm text-[#1F1F1F]">
                    <p className="font-medium mb-2">
                      Adresse de livraison
                    </p>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country}
                    </p>
                    <p className="text-[#8A8A8A] mt-1">
                      Tél : {order.shippingAddress.phone}
                    </p>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Orders;
