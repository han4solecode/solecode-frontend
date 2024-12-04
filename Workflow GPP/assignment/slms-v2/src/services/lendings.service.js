import axios from "axios";

export const getAllLendings = async () => {
  try {
    const res = await axios.get("/api/lend");
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const borrowBook = async (data) => {
  try {
    const res = await axios.post("/api/lend", data);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const returnBook = async (lendingId) => {
  try {
    const res = await axios.delete(`/api/lend/${lendingId}`);
    console.log(res.status);
    const data = res.status;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
