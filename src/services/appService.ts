import api from "./axiosService";

interface CreateAppPayload {
  name: string;
  baseUrl: string;
  redirect: string;
}

export const createApp = async (data: CreateAppPayload) => {
  const response = await api.post("/apps/create", data);
  return response.data;
};

export const getApps = async () => {
  const response = await api.get("/apps/getMyApps");
  return response.data;
};
