import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du compte");
      setError("Impossible de créer le compte");

    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez l’univers Adopt Parfums"
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          type="text"
          placeholder="Nom complet"
          className="w-full border rounded-full px-5 py-3 focus:outline-none focus:border-secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}


        <input
          type="email"
          placeholder="Adresse email"
          className="w-full border rounded-full px-5 py-3 focus:outline-none focus:border-secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}


        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border rounded-full px-5 py-3 focus:outline-none focus:border-secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-full hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>

      </form>

      <p className="text-center text-sm text-[#8A8A8A] mt-8">
        Déjà un compte ?{" "}
        <Link to="/login" className="text-secondary font-medium">
          Se connecter
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
