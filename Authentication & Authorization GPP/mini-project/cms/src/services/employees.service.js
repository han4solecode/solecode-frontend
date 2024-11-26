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

export const searchEmployees = async (params) => {
  try {
    return await axios.get(`/api/employee/s`, { params });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getAllEmployeesNoPaging = async () => {
  try {
    const res = await axios.get(`/api/employee/all`);
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

export const deactivateEmployee = async (employeeId, reason) => {
  try {
    const res = await axios.patch(
      `/api/employee/${employeeId}/deactive`,
      reason
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
