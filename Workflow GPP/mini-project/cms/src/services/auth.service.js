import api from "../Api";

const register = async (userData) => {
  const res = await api.post("/api/employee/create", userData);
  return res;
};

const login = async (userData) => {
  const res = await api.post("/api/auth/login", userData);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res;
};

const logout = async () => {
  const res = await api.post("/api/auth/logout");
  localStorage.removeItem("user");
  return res;
};

const refreshToken = async () => {
  const res = await api.post("/api/auth/refresh-token");
  localStorage.setItem("user", JSON.stringify(res.data));
  return res;
};

const AuthService = {
  register,
  login,
  logout,
  refreshToken,
};

export default AuthService;
