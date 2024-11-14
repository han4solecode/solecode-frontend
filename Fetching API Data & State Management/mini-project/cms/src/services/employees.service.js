import axios from "axios";

export const getAllEmployees = async (recordsPerPage, currentPage) => {
  try {
    const res = await axios.get(
      `/api/employee?recordsPerPage=${recordsPerPage}&currentPage=${currentPage}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getEmployeeById = async (employeeId) => {
  try {
    const res = await axios.get(`/api/employee/${employeeId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const addEmployee = async (employee) => {
  try {
    const res = await axios.post("/api/employee", employee);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateEmployee = async (employeeId, updatedEmployee) => {
  try {
    const res = await axios.put(`/api/employee/${employeeId}`, updatedEmployee);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const res = await axios.delete(`/api/employee/${employeeId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
