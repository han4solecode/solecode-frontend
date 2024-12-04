import axios from "axios";
import api from "../Api";

export const getAllBooks = async () => {
  try {
    const res = await api.get("/api/book");
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const searchBooks = async (params) => {
  try {
    return await api.get(`/api/book/s`, { params });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getBookById = async (id) => {
  try {
    const res = await api.get(`/api/book/${id}`);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const createNewBook = async (book) => {
  try {
    const res = await api.post("/api/book", book);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateExistingBook = async (id, updatedBook) => {
  try {
    const res = await api.put(`/api/book/${id}`, updatedBook);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await api.delete(`/api/book/${id}`);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const requestBook = async (requestedBookData) => {
  await api.post(`/api/book/request`, requestedBookData);
};

export const searchBookRequest = async (params) => {
  return await api.get("/api/book/requests", { params });
};

export const getBookRequestProcessById = async (id) => {
  const res = await api.get(`/api/book/request/${id}`);
  return res;
};
