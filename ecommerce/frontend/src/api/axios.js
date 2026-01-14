import axios from "axios";
import { getCsrfToken } from "../utils/csrf";

/**
 * Instance Axios principale
 */
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true, // OBLIGATOIRE pour refreshToken (cookies)
});


api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();

  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }

  return config;
});

/**
 * Access token en mémoire (PAS dans localStorage)
 */
let accessToken = null;

/**
 * Setter du token
 */
export const setAccessToken = (token) => {
  accessToken = token;
};

/**
 * Getter (optionnel)
 */
export const getAccessToken = () => accessToken;

/**
 * Interceptor REQUEST
 * → ajoute Authorization automatiquement
 */
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      return config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor RESPONSE
 * → refresh token automatique si 401
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // NE PAS INTERCEPTER LE REFRESH
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        setAccessToken(null);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);



export default api;
