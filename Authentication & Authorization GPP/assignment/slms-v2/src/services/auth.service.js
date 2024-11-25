import api from "../Api";

const register = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const login = async (userData) => {
  try {
    const res = await api.post("/auth/login", userData);
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
    await api.post("/auth/logout");
    localStorage.removeItem("user");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
