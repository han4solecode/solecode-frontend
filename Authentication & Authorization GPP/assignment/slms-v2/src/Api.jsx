import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle 401 error (unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      // redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
