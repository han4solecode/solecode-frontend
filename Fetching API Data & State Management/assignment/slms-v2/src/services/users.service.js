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
