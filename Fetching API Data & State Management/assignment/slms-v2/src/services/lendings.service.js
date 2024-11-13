import axios from "axios";

export const getAllLendings = async () => {
  try {
    const res = await axios.get("/api/lend");
    console.log(res.data.$values);
    const data = res.data.$values;
    return data;
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
