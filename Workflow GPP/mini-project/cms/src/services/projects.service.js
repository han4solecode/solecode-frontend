import axios from "axios";
import api from "../Api";

export const getAllProjects = async (recordsPerPage, currentPage) => {
  try {
    const res = await api.get(
      `/api/project?recordsPerPage=${recordsPerPage}&currentPage=${currentPage}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getAllProjectsNoPaging = async () => {
  try {
    const res = await api.get(`/api/project/all`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getProjectById = async (projectId) => {
  try {
    const res = await api.get(`/api/project/${projectId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const addProject = async (project) => {
  try {
    const res = await api.post("/api/project", project);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateProject = async (projectId, updatedProject) => {
  try {
    const res = await api.put(`/api/project/${projectId}`, updatedProject);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteProject = async (projectId) => {
  try {
    const res = await api.delete(`/api/project/${projectId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
