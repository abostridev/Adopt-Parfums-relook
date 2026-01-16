import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);

  const fetchOrders = async () => {
    if (!user) {
      setOrderCount(0);
      return;
    }

    try {
      const res = await api.get("/orders/my");
      setOrderCount(
        res.data.filter(o => o.status !== "delivered").length
      );
    } catch {
      setOrderCount(0);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <OrderContext.Provider value={{ orderCount, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
