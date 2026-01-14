import axios from "axios";
import { getCsrfToken } from "../utils/csrf";

let accessToken = null;

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export const setAccessToken = (token) => { accessToken = token; };

// UN SEUL intercepteur de requête pour tout gérer
api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) config.headers["x-csrf-token"] = csrfToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si 401 et que ce n'est pas déjà une tentative de retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Éviter de refresh si on est déjà sur la route de login ou refresh
      if (originalRequest.url.includes("/auth/refresh") || originalRequest.url.includes("/auth/login")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken);
        
        // Mettre à jour le header pour la requête qui a échoué
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Relancer la requête originale
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        // Optionnel : window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
