import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders").then(res => setOrders(res.data));
  }, []);

  if (!orders) return <p>Chargement...</p>;

  return (
    <>
      <h1 className="text-4xl font-serif mb-10">Commandes</h1>


      <div className="grid gap-6">
        {orders.map(order => (
          <Link to={`/admin/orders/${order._id}`} >

            <div
              key={order._id}
              className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center border border-secondary/80"
            >
              <div>
                <p className="font-medium ">
                  {order.user?.name } &nbsp;  
                   <span className="text-secondary">
                    —
                  </span>
                  &nbsp; {order.user?.email}
                 
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right space-y-2">
                <p className="font-semibold">{order.totalPrice} €</p>
                <StatusBadge status={order.status} />
                <span className="text-sm text-secondary hover:underline block mt-1">
                  Voir le détail →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>




    </>
  );
};

const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-orange-100 text-orange-700",
    paid: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-4 py-1 rounded-full text-xs ${colors[status]}`}>
      {status}
    </span>
  );
};

export default AdminOrders;
