import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // hydrate auth global
      await login(res.data.accessToken);

      // sécurité admin
      if (res.data.role && res.data.role !== "admin") {
        setError("Accès réservé à l’administration");
        return;
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Accès refusé ou identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] p-10 rounded-2xl w-full max-w-md space-y-6"
      >
        <h1 className="font-semibold text-center">
          <span className="text-amber-100 font-title text-3xl">Adopt</span>
          <span className="text-secondary text-2xl font-body"> — Parfums</span>
        </h1>

        <h2 className="text-white text-xl font-semibold text-center">
          Admin Access
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded bg-black text-white border"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded bg-black text-white border"
          required
        />

        <button className="w-full bg-secondary py-3 rounded text-white">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
