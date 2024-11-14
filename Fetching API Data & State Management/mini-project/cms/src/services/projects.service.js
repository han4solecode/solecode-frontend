import axios from "axios";

export const getAllProjects = async (recordsPerPage, currentPage) => {
  try {
    const res = await axios.get(
      `/api/project?recordsPerPage=${recordsPerPage}&currentPage=${currentPage}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getProjectById = async (projectId) => {
  try {
    const res = await axios.get(`/api/project/${projectId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const addProject = async (project) => {
  try {
    const res = await axios.post("/api/project", project);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateProject = async (projectId, updatedProject) => {
  try {
    const res = await axios.put(`/api/project/${projectId}`, updatedProject);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteProject = async (projectId) => {
  try {
    const res = await axios.delete(`/api/project/${employeeId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
