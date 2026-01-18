import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Upload, Video, Trash2, Edit3, Power, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getMediaUrl } from "../../utils/media";

const AdminConseils = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [conseils, setConseils] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null); // Pour le loading individuel

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

  // Fonction pour Activer/Désactiver avec loading
  const handleToggle = async (id) => {
    setProcessingId(id);
    try {
      await api.patch(`/admin/conseils/${id}/toggle`);
      await fetchConseils();
    } catch (err) {
      console.error("Erreur toggle", err);
    } finally {
      setProcessingId(null);
    }
  };

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

      {/* FORMULAIRE */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm mb-12 border border-gray-50">
        <h2 className="text-xl font-serif mb-6">Nouveau conseil</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase mb-2 block tracking-wider">Titre</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black transition"
                placeholder="Ex : Bien choisir son parfum"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase mb-2 block tracking-wider">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent h-32 resize-none focus:bg-white focus:ring-2 focus:ring-black transition"
                placeholder="Expliquez brièvement..."
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <label className="text-xs font-semibold uppercase mb-2 block tracking-wider">Vidéo</label>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4">
              <div className="w-full sm:w-48 h-32 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 text-gray-400">
                {preview ? <video src={preview} className="w-full h-full object-cover" /> : <Video size={30} />}
              </div>
              <label className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-black text-sm font-medium hover:bg-black hover:text-white transition">
                <Upload size={18} /> {video ? "Changer" : "Téléverser"}
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
              {loading ? "Publication en cours..." : "Publier maintenant"}
            </button>
          </div>
        </div>
      </div>

      {/* LISTE - OPTIMISÉE TABLETTE */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-lg font-serif mb-2">Historique</h3>
        {conseils.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <video src={getMediaUrl(c.video)} className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">{c.title}</p>
                <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</p>
                {/* Badge visible uniquement sur tablette/mobile ici */}
                <div className={`mt-2 lg:hidden inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {c.isActive ? "Actif" : "Hors-ligne"}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-none">
              {/* Badge visible sur Desktop */}
              <div className={`hidden lg:flex px-3 py-1.5 rounded-full text-xs font-semibold mr-2 ${c.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {c.isActive ? "Publié" : "Désactivé"}
              </div>
              
              <Link to={`/admin/conseils/${c._id}/edit`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-xl text-sm transition">
                <Edit3 size={16} /> <span className="sm:inline">Modifier</span>
              </Link>
              
              <button 
                onClick={() => handleToggle(c._id)}
                disabled={processingId === c._id}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-sm transition ${processingId === c._id ? "opacity-50" : "hover:bg-gray-100 text-gray-700"}`}
              >
                {processingId === c._id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Power size={16} />
                )}
                <span className="sm:inline">{c.isActive ? "Couper" : "Activer"}</span>
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
