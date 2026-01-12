import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    setError("");

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    await login(res.data.accessToken);
    navigate(redirectTo, { replace: true });
  } catch {
    setError("Email ou mot de passe incorrect");
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthLayout title="Connexion" subtitle="Accédez à votre univers olfactif">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="email"
          placeholder="Adresse email"
          className="w-full border rounded-full px-5 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border rounded-full px-5 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-full hover:scale-105 transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={() =>
            window.location.href = "http://localhost:5000/api/auth/google"
          }
          className="w-full border py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Continuer avec Google
        </button>

      </motion.form>

      <Link to="/forgot-password" className="text-sm   text-secondary">
        <p className="text-center mt-2 ">Mot de passe oublié ?</p>
      </Link>

      <p className="text-center text-sm mt-8">
        Pas encore de compte ?{" "}
        <Link to="/register" className="text-secondary font-medium">
          Créer un compte
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
