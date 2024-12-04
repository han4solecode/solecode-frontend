import axios from "axios";
import { refreshToken } from "./slices/authSlice";
import { store } from "./store";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

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
        // refreshToken();
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

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Tangani error 401 (Unauthorized)
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("user");
//       // Redirect ke halaman login
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
