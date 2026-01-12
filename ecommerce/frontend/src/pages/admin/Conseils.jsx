import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Upload, Video } from "lucide-react";
import { Link } from "react-router-dom";

const AdminConseils = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [conseils, setConseils] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConseils = async () => {
    const res = await api.get("/admin/conseils");
    setConseils(res.data);
  };

  useEffect(() => {
    fetchConseils();
  }, []);

  const submit = async () => {
    if (!title || !description || !video) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);

    await api.post("/admin/conseils", formData);

    setTitle("");
    setDescription("");
    setVideo(null);
    setPreview(null);

    await fetchConseils();
    setLoading(false);
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-serif mb-2">
          Conseils & Astuces
        </h1>
        <p className="text-[#8A8A8A] max-w-xl">
          Publiez des conseils utiles accompagnés de vidéos pour guider vos clients
          et renforcer la confiance dans vos produits.
        </p>
      </div>

      {/* FORMULAIRE */}
      <div className="bg-white rounded-3xl p-8 shadow-sm mb-16 max-w-3xl">
        <h2 className="text-xl font-serif mb-6">
          Publier un nouveau conseil
        </h2>

        {/* TITRE */}
        <div className="mb-6">
          <label className="text-sm font-medium block mb-2">
            Titre du conseil
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Ex : Comment bien choisir son parfum"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="text-sm font-medium block mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border h-32 resize-none focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Expliquez brièvement le conseil donné dans la vidéo…"
          />
        </div>

        {/* VIDEO */}
        <div className="mb-8">
          <label className="text-sm font-medium block mb-3">
            Vidéo
          </label>

          <div className="flex items-center gap-6">
            {/* PREVIEW */}
            {preview ? (
              <video
                src={preview}
                controls
                className="w-48 h-32 rounded-xl object-cover border"
              />
            ) : (
              <div className="w-48 h-32 rounded-xl border flex items-center justify-center text-gray-400">
                <Video size={28} />
              </div>
            )}

            {/* UPLOAD */}
            <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-full border text-sm hover:bg-[#FAF7F5] transition">
              <Upload size={16} />
              Choisir une vidéo
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setVideo(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>

        {/* ACTION */}
        <button
          onClick={submit}
          disabled={loading}
          className={`px-8 py-3 rounded-full text-white transition ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:opacity-90"
            }`}
        >
          {loading ? "Publication..." : "Publier le conseil"}
        </button>
      </div>

      {/* HISTORIQUE */}
      <div className="space-y-4">
        {conseils.map((c) => (
          <div
            key={c._id}
            className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-6"
          >
            {/* MINIATURE */}
            <video
              src={`${import.meta.env.VITE_API_URL}${c.video}`}
              className="w-32 h-20 rounded-xl object-cover"
              muted
            />

            {/* INFOS */}
            <div className="flex-1">
              <p className="font-medium">{c.title}</p>
              <p className="text-sm text-[#8A8A8A]">
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* STATUS */}
            <span
              className={`text-xs px-4 py-1 rounded-full font-semibold ${c.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
                }`}
            >
              {c.isActive ? "Publié" : "Désactivé"}
            </span>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <Link
                to={`/admin/conseils/${c._id}/edit`}
                className="px-4 py-2 rounded-full border border-blue-300 text-sm hover:bg-[#FAF7F5]"
              >
                Modifier
              </Link>

              <button
                onClick={() =>
                  api.patch(`/admin/conseils/${c._id}/toggle`).then(fetchConseils)
                }
                className="text-sm px-4 py-2 rounded-full border hover:bg-[#FAF7F5]"
              >
                {c.isActive ? "Désactiver" : "Activer"}
              </button>

              <button
                onClick={() =>
                  api.delete(`/admin/conseils/${c._id}`).then(fetchConseils)
                }
                className="text-sm px-4 py-2 rounded-full border text-red-500 hover:bg-red-50"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default AdminConseils;
