import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const EditAdvice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    api.get(`/admin/conseils`).then(res => {
      const advice = res.data.find(a => a._id === id);
      setForm({
        title: advice.title,
        description: advice.description,
      });
      setPreview(
        `${import.meta.env.VITE_API_URL}${advice.video}`
      );
    });
  }, [id]);

  const submit = async () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (video) data.append("video", video);

    await api.put(`/admin/conseils/${id}`, data);
    navigate("/admin/conseils");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-serif mb-8">
        Modifier le conseil
      </h1>

      <input
        className="w-full mb-4 px-4 py-3 rounded-xl border"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        className="w-full mb-6 px-4 py-3 rounded-xl border h-32"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {preview && (
        <video
          src={preview}
          controls
          className="w-full h-64 rounded-xl object-cover mb-6"
        />
      )}

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        className="bg-amber-400 rounded-3xl py-3 px-3"
      />

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-full border"
        >
          Annuler
        </button>

        <button
          onClick={submit}
          className="px-8 py-3 rounded-full bg-black text-white"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default EditAdvice;
