import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      navigate("/login");
    } catch {
      setError("Lien expiré ou invalide");
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF7F5] flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-10 rounded-3xl w-full max-w-md"
      >
        <h1 className="text-3xl font-serif mb-6">
          Nouveau mot de passe
        </h1>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full border px-4 py-3 rounded-xl mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="mt-6 w-full bg-black text-white py-3 rounded-full">
          Réinitialiser
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
