import api from "../Api";

const register = async (userData) => {
  //   try {
  //     const res = await api.post("/api/auth/register", userData);
  //     return res.data;
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  const res = await api.post("/api/auth/register", userData);
  return res;
};

const login = async (userData) => {
  //   try {
  //     const res = await api.post("/api/auth/login", userData);
  //     console.log(res.status);

  //     if (res.data.user && res.status === 200) {
  //       localStorage.setItem("user", JSON.stringify(res.data));
  //       return res.data;
  //     } else {
  //       throw new Error(res.data.message);
  //     }
  //   } catch (error) {
  //     // console.log(`Error: ${error}`);
  //     console.log(error.message);
  //   }
  const res = await api.post("/api/auth/login", userData);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res;
};

const logout = async () => {
  //   try {
  //     await api.post("/api/auth/logout");
  //     localStorage.removeItem("user");
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  const res = await api.post("/api/auth/logout");
  localStorage.removeItem("user");
  return res;
};

const refreshToken = async () => {
  //   try {
  //     const res = await api.post("/api/auth/refresh-token");
  //     if (res.data.status === "Success") {
  //       localStorage.setItem("user", JSON.stringify(res.data));
  //     }
  //     return res.data;
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
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
