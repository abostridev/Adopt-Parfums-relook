import { useState } from "react";
import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white border-b-2  fixed top-0 left-0 right-0 z-50"
    >
      <form
        onSubmit={submit}
        className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4"
      >
        <Search className="text-gray-400" />

        <input
          autoFocus
          type="text"
          placeholder="Rechercher un parfum, une catégorie…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-lg outline-1 rounded-3xl py-2 px-4 placeholder-gray-400"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition"
        >
          Rechercher
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-black"
        >
          <X />
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
