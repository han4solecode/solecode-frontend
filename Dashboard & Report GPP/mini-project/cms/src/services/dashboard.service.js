import AxiosInstance from "../Api";

export const getKpi = async () => {
  return await AxiosInstance.api.get("/api/dashboard/kpi");
};

export const getProcessesToReview = async () => {
  return await AxiosInstance.api.get("/api/dashboard/processes");
};
