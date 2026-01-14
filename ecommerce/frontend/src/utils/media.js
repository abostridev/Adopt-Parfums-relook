const API_URL = import.meta.env.VITE_API_URL.replace(/\/api$/, "");

export const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // already absolute on backend (starts with /uploads/...)
  return `${API_URL}${path}`;
};

export default getMediaUrl;
