import api from "../Api";

const register = async (userData) => {
  try {
    const res = await api.post("/api/auth/register", userData);
    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const login = async (userData) => {
  try {
    const res = await api.post("/api/auth/login", userData);
    console.log(res.status);

    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const logout = async () => {
  try {
    await api.post("/api/auth/logout");
    localStorage.removeItem("user");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const refreshToken = async () => {
  try {
    const res = await api.post("/api/auth/refresh-token");
    if (res.data.status === "Success") {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const AuthService = {
  register,
  login,
  logout,
  refreshToken,
};

export default AuthService;
