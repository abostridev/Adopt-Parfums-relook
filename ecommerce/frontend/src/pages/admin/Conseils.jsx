import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Upload, Video, Trash2, Edit3, Power } from "lucide-react";
import { Link } from "react-router-dom";
import { getMediaUrl } from "../../utils/media";

const AdminConseils = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [conseils, setConseils] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConseils = async () => {
    try {
      const res = await api.get("/admin/conseils");
      setConseils(res.data);
    } catch (err) {
      console.error("Erreur chargement", err);
    }
  };

  useEffect(() => {
    fetchConseils();
  }, []);

  const submit = async () => {
    if (!title || !description || !video) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", video);
      await api.post("/admin/conseils", formData);
      setTitle(""); setDescription(""); setVideo(null); setPreview(null);
      await fetchConseils();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif mb-2">Conseils & Astuces</h1>
        <p className="text-[#8A8A8A] text-sm md:text-base max-w-2xl">
          Publiez des conseils vidéos pour guider vos clients.
        </p>
      </div>

      {/* FORMULAIRE - Optimisé pour Tablettes */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm mb-12 border border-gray-50">
        <h2 className="text-xl font-serif mb-6">Nouveau conseil</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block">Titre</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black transition"
                placeholder="Ex : Bien choisir son parfum"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent h-32 resize-none focus:bg-white focus:ring-2 focus:ring-black transition"
                placeholder="Expliquez brièvement..."
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider mb-2 block">Vidéo</label>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4">
              <div className="w-full sm:w-48 h-32 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                {preview ? (
                  <video src={preview} className="w-full h-full object-cover" />
                ) : (
                  <Video size={30} className="text-gray-300" />
                )}
              </div>
              <label className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-black text-sm font-medium hover:bg-black hover:text-white transition">
                <Upload size={18} />
                {video ? "Changer" : "Téléverser"}
                <input type="file" accept="video/*" hidden onChange={(e) => {
                  const file = e.target.files[0];
                  if(file) { setVideo(file); setPreview(URL.createObjectURL(file)); }
                }} />
              </label>
            </div>
            
            <button
              onClick={submit}
              disabled={loading}
              className="mt-6 w-full py-4 rounded-xl bg-black text-white font-medium disabled:bg-gray-300 transition-all hover:shadow-lg active:scale-[0.98]"
            >
              {loading ? "Chargement..." : "Publier maintenant"}
            </button>
          </div>
        </div>
      </div>

      {/* LISTE - Correction Majeure Tablette */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-lg font-serif mb-2">Historique des conseils</h3>
        {conseils.map((c) => (
          <div
            key={c._id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:flex-row xl:items-center gap-4"
          >
            {/* GAUCHE: Vidéo + Texte */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative group flex-shrink-0">
                <video src={getMediaUrl(c.video)} className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                  <Video size={16} className="text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">{c.title}</p>
                <p className="text-xs text-gray-500 mt-1">Créé le {new Date(c.createdAt).toLocaleDateString()}</p>
                <div className={`mt-2 inline-flex lg:hidden px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {c.isActive ? "Actif" : "Hors-ligne"}
                </div>
              </div>
            </div>

            {/* DROITE: Actions (Adaptées Tablette) */}
            <div className="flex flex-wrap items-center gap-2 pt-3 xl:pt-0 border-t xl:border-none">
              <div className={`hidden lg:flex px-3 py-1.5 rounded-full text-xs font-semibold mr-2 ${c.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {c.isActive ? "Publié" : "Désactivé"}
              </div>
              
              <Link to={`/admin/conseils/${c._id}/edit`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-xl text-sm transition">
                <Edit3 size={16} /> <span className="sm:inline">Modifier</span>
              </Link>
              
              <button 
                onClick={() => api.patch(`/admin/conseils/${c._id}/toggle`).then(fetchConseils)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm transition"
              >
                <Power size={16} /> <span className="sm:inline">{c.isActive ? "Couper" : "Activer"}</span>
              </button>

              <button 
                onClick={() => api.delete(`/admin/conseils/${c._id}`).then(fetchConseils)}
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminConseils;









/*import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Upload, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { getMediaUrl } from "../../utils/media";

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
      {/* HEADER */}/*
      <div className="mb-12">
        <h1 className="text-4xl font-serif mb-2">
          Conseils & Astuces
        </h1>
        <p className="text-[#8A8A8A] max-w-xl">
          Publiez des conseils utiles accompagnés de vidéos pour guider vos clients
          et renforcer la confiance dans vos produits.
        </p>
      </div>

      {/* FORMULAIRE 
      <div className="bg-white rounded-3xl p-8 shadow-sm mb-16 max-w-3xl">
        <h2 className="text-xl font-serif mb-6">
          Publier un nouveau conseil
        </h2>

        {/* TITRE *
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

        {/* DESCRIPTION 
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

        {/* VIDEO *
        <div className="mb-8">
          <label className="text-sm font-medium block mb-3">
            Vidéo
          </label>

          <div className="flex items-center gap-6">
            {/* PREVIEW *
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

            {/* UPLOAD *
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

        {/* ACTION *
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

      {/* HISTORIQUE *
      <div className="space-y-4">
  {conseils.map((c) => (
    <div
      key={c._id}
      className="bg-white p-4 md:p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
    >
      {/* HEADER MOBILE (Vidéo + Titre côte à côte sur mobile) *
      <div className="flex items-center gap-4 flex-1">
        <video
          src={getMediaUrl(c.video)}
          className="w-24 h-16 md:w-32 md:h-20 rounded-xl object-cover flex-shrink-0"
          muted
        />
        <div className="min-w-0"> {/* min-w-0 évite que le texte casse le layout *
          <p className="font-medium truncate">{c.title}</p>
          <p className="text-sm text-[#8A8A8A]">
            {new Date(c.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* STATUS (Positionné en haut à droite sur mobile via flex-row-reverse ou simple bloc) *
      <div className="flex items-center justify-between md:justify-end gap-3">
        <span
          className={`text-xs px-4 py-1 rounded-full font-semibold ${
            c.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {c.isActive ? "Publié" : "Désactivé"}
        </span>
      </div>

      {/* ACTIONS (Grille sur mobile, ligne sur tablette/desktop) *
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-3 border-t md:border-none md:pt-0">
        <Link
          to={`/admin/conseils/${c._id}/edit`}
          className="px-4 py-2 rounded-full border border-blue-300 text-sm hover:bg-[#FAF7F5] text-center"
        >
          Modifier
        </Link>

        <button
          onClick={() => api.patch(`/admin/conseils/${c._id}/toggle`).then(fetchConseils)}
          className="text-sm px-4 py-2 rounded-full border hover:bg-[#FAF7F5]"
        >
          {c.isActive ? "Désactiver" : "Activer"}
        </button>

        <button
          onClick={() => api.delete(`/admin/conseils/${c._id}`).then(fetchConseils)}
          className="text-sm px-4 py-2 rounded-full border text-red-500 hover:bg-red-50 col-span-2 sm:col-auto"
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

export default AdminConseils;*/
