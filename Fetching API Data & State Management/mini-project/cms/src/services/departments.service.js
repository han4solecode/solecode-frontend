import axios from "axios";

export const getAllDepartment = async (recordsPerPage, currentPage) => {
  try {
    const res = await axios.get(
      `/api/department?recordsPerPage=${recordsPerPage}&currentPage=${currentPage}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getDepartmentById = async (departmentId) => {
  try {
    const res = await axios.get(`/api/department/${departmentId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const addDepartment = async (department) => {
  try {
    const res = await axios.post("/api/department", department);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateDepartment = async (departmentId, updatedDepartment) => {
  try {
    const res = await axios.put(
      `/api/department/${departmentId}`,
      updatedDepartment
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteDepartment = async (departmentId) => {
  try {
    const res = await axios.delete(`/api/department/${departmentId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
