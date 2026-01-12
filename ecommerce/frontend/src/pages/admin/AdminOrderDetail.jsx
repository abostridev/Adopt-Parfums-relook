import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const STATUS = [
  { value: "pending", label: "En attente" },
  { value: "paid", label: "Payée" },
  { value: "shipped", label: "Expédiée" },
  { value: "delivered", label: "Livrée" },
];

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/admin/orders/${id}`).then((res) => {
      setOrder(res.data);
      setStatus(res.data.status);
    });
  }, [id]);

  const updateStatus = async () => {
    try {
      setSaving(true);
      const res = await api.put(`/admin/orders/${id}/status`, { status });
      setOrder(res.data);
    } finally {
      setSaving(false);
    }
  };

  if (!order) return <p>Chargement...</p>;

  return (
    <>
      <h1 className="text-4xl font-serif mb-10">Commande</h1>

      {/* CLIENT */}
      <div className="bg-white p-6 rounded-2xl mb-6 border border-secondary/80">
        <p className="font-medium">
          {order.user.name} — {order.user.email}
        </p>
        <p className="text-sm text-gray-500">
          {order.shippingAddress.phone}
        </p>
      </div>

      {/* STATUT */}
      <div className="bg-white p-6 rounded-2xl mb-6 flex items-center justify-between border border-secondary/80">
        <div>
          <p className="text-sm text-gray-500 mb-1">Statut de la commande</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-full px-4 py-2 text-sm focus:outline-none"
          >
            {STATUS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={updateStatus}
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded-full text-sm hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </div>

      {/* ADRESSE */}
      <div className="bg-white p-6 rounded-2xl mb-6 border border-secondary/80">
        <p className="font-medium mb-2">Adresse de livraison</p>
        <p>
          {order.shippingAddress.address},{" "}
          {order.shippingAddress.city},{" "}
          {order.shippingAddress.country}
        </p>
      </div>

      {/* PRODUITS */}
      <div className="bg-white p-6 rounded-2xl space-y-4 border border-secondary/80">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 border-b pb-4">
            <img
              src={item.image}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Quantité : {item.quantity}
              </p>
            </div>
            <p>{item.price} €</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminOrderDetail;
