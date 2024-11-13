import axios from "axios";

export const getAllBooks = async () => {
  try {
    const res = await axios.get("/api/book");
    const data = res.data.$values;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
