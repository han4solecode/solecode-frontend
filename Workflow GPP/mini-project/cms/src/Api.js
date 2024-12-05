import axios from "axios";
import { refreshToken } from "./slices/authSlice";
import { store } from "./store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // handle 401 error (unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        store.dispatch(refreshToken());
        return api(originalRequest);
      } catch (refreshError) {
        // redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const apiFormData = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

apiFormData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // handle 401 error (unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        store.dispatch(refreshToken());
        return api(originalRequest);
      } catch (refreshError) {
        // redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const AxiosInstance = {
  api,
  apiFormData,
};

// export default api;
export default AxiosInstance;
