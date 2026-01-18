import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // INIT AUTH 
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.accessToken);

        // NE PAS FORCER LE HEADER
        const me = await api.get("/users/me");
        if (isMounted) setUser(me.data);
      } catch {
        if (isMounted) setUser(null);
        setAccessToken(null);
      } finally {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 800);
      }
    };

    initAuth();
    return () => { isMounted = false };
  }, []);

  // LOGIN
  const login = async (accessToken) => {
    setAccessToken(accessToken);
    const me = await api.get("/users/me");
    setUser(me.data);
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
