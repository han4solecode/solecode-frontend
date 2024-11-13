import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/api/user");
    console.log(res.data.$values);
    const data = res.data.$values;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`/api/user/${id}`);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const createNewUser = async (user) => {
  try {
    const res = await axios.post("/api/user", user);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateExistingUser = async (id, updatedUser) => {
  try {
    const res = await axios.put(`/api/user/${id}`, updatedUser);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/api/user/${id}`);
    console.log(res.status);
    const data = res.status;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
