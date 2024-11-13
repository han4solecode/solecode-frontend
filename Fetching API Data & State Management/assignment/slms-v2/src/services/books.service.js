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

export const getBookById = async (id) => {
  try {
    const res = await axios.get(`/api/book/${id}`);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const createNewBook = async (book) => {
  try {
    const res = await axios.post("/api/book", book);
    console.log(res.data);
    const data = res.data;
    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
