import axios from "axios";

export const getAllBooks = async () => {
  try {
    const res = await axios.get("/api/book");
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const searchBooks = async (
  pageNumber,
  PageSize,
  keyword,
  sortBy,
  sortOrder,
  title,
  author,
  isbn
) => {
  try {
    const res = await axios.get(
      `/api/book/s?pageNumber=${pageNumber}&pageSize=${PageSize}&keyword=${keyword}&sortBy=${sortBy}&sortOrder=${sortOrder}&title=${title}&author=${author}&isbn=${isbn}`
    );
    console.log(res.data);
    const data = res.data;
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
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateExistingBook = async (id, updatedBook) => {
  try {
    const res = await axios.put(`/api/book/${id}`, updatedBook);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await axios.delete(`/api/book/${id}`);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
