import { useState } from "react";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch {
      setError("Email introuvable");
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF7F5] flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-10 rounded-3xl w-full max-w-md shadow-sm"
      >
        <h1 className="text-3xl font-serif mb-6">
          Mot de passe oublié
        </h1>

        <input
          type="email"
          placeholder="Votre email"
          className="w-full border px-4 py-3 rounded-xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button className="mt-6 w-full bg-black text-white py-3 rounded-full">
          Envoyer le lien
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
