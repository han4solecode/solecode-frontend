import axios from "axios";
import api from "../Api";
import AxiosInstance from "../Api";

export const getAllEmployees = async (recordsPerPage, currentPage) => {
  try {
    const res = await api.get(
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
  // try {
  // } catch (error) {
  //   console.log(`Error: ${error}`);
  // }
  const res = await axios.get(`/api/employee/all`);
  console.log(res);
  return res;
};

export const getEmployeeById = async (employeeId) => {
  try {
    const res = await api.get(`/api/employee/${employeeId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getEmployeeProfile = async () => {
  try {
    const res = await AxiosInstance.api.get("/api/employee/profile");
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const addEmployee = async (employee) => {
  try {
    const res = await api.post("/api/employee", employee);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateEmployee = async (employeeId, updatedEmployee) => {
  try {
    const res = await api.put(`/api/employee/${employeeId}`, updatedEmployee);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const res = await api.delete(`/api/employee/${employeeId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const deactivateEmployee = async (employeeId, reason) => {
  try {
    const res = await api.patch(`/api/employee/${employeeId}/deactive`, reason);
    console.log(res);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const requestLeave = async (requestedLeaveData) => {
  return await AxiosInstance.apiFormData.post(
    "/api/employee/request/leave",
    requestedLeaveData
  );
};

export const searchLeaveRequest = async (params) => {
  return await AxiosInstance.api.get("/api/employee/requests/leave", {
    params,
  });
};

export const getLeaveRequestProcessById = async (id) => {
  return await AxiosInstance.api.get(`api/employee/request/leave/${id}`);
};

export const reviewLeaveRequest = async (reviewData) => {
  return await AxiosInstance.api.post(
    "/api/employee/request/review",
    reviewData
  );
};

export const downloadMedicalCertificate = async (processId) => {
  return await AxiosInstance.apiOctet.get(
    `request/leave/med-cert/dl/${processId}`
  );
};
