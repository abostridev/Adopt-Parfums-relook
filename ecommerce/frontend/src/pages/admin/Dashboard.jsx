import { useEffect, useState } from "react";
import api from "../../api/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setData(res.data);
      } catch (err) {
        setError(err.message);
        console.error("Dashboard API Error:", err);
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <p className="text-red-500">Erreur: {error}</p>;
  if (!data) return <p>Chargement...</p>;

  const { stats, recentOrders } = data;

  return (
    <>
      <h1 className="text-4xl font-serif mb-10">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
        <Stat title="Commandes" value={stats.totalOrders} />
        <Stat title="Chiffre d'affaires" value={`${stats.totalRevenue} €`} />
        <Stat title="Stock faible" value={stats.lowStockProducts} />
        <Stat title="En attente" value={stats.pendingOrders} />
      </div>


      {/* DERNIÈRES COMMANDES */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-serif mb-6">Dernières commandes</h2>

        <div className="space-y-4 ">
          {recentOrders.map(order => (
            <div key={order._id} className="flex justify-between text-sm ">
              <span>{order.user?.name}</span>
              <span>{order.totalPrice} €</span>
              <span
                className={`font-medium ${order.status === "pending"
                    ? "text-orange-500"
                    : order.status === "paid"
                      ? "text-green-600"
                      : "text-blue-500"
                  }`}
              >
                {order.status}
              </span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
    <p className="text-xs tracking-widest uppercase text-[#8A8A8A]">
      {title}
    </p>
    <p className="text-3xl font-semibold mt-3 text-[#1F1F1F]">
      {value}
    </p>
  </div>
);


export default Dashboard;
