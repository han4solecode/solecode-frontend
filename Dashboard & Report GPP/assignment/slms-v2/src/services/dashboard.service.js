import api from "../Api";

export const getKpi = async () => {
  const res = await api.get("/api/dashboard/kpi");
  return res;
};

export const getProcessesToReview = async () => {
  const res = await api.get("/api/dashboard/processes");
  return res;
};
