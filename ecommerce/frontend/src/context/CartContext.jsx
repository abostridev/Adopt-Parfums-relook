import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }

    try {
      setLoadingCart(true);
      const res = await api.get("/cart");
      setCartCount(res.data.length);
    } catch {
      setCartCount(0);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cartCount, fetchCart, loadingCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
