import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Refresh au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh", {}, { withCredentials: true });
        setAccessToken(res.data.accessToken);

        // FORCER HEADER
        const me = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
        });

        setUser(me.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);


  // 🔐 LOGIN
  const login = async (userData) => {
    try {
      if (typeof userData === "string") {
        // userData is accessToken
        setAccessToken(userData);
        const me = await api.get("/users/me");
        setUser(me.data);
        return;
      }

      // fallback: if directly passed user object
      setUser(userData);
    } catch (error) {
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch { }

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
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

