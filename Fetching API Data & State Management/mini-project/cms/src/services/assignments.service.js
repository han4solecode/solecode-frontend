import axios from "axios";

export const getAllAssignment = async (recordsPerPage, currentPage) => {
  try {
    const res = await axios.get(
      `/api/workson?recordsPerPage=${recordsPerPage}&currentPage=${currentPage}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getAllAssignmentsNoPaging = async () => {
  try {
    const res = await axios.get(`/api/workson/all`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getAssignmentById = async (employeeId, projectId) => {
  try {
    const res = await axios.get(`/api/workson/${employeeId}/${projectId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const addAssignment = async (assignment) => {
  try {
    const res = await axios.post("/api/workson", assignment);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateAssignment = async (
  employeeId,
  projectId,
  updatedAssignment
) => {
  try {
    const res = await axios.put(
      `/api/workson/${employeeId}/${projectId}`,
      updatedAssignment
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteAssignment = async (employeeId, projectId) => {
  try {
    const res = await axios.delete(`/api/workson/${employeeId}/${projectId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
