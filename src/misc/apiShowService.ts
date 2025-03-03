import axios from "axios";

const apiShowClient = axios.create({
  baseURL: "https://api.tvmaze.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getShows = async () => {
  const response = await apiShowClient.get("/shows");
  return response;
};

export const getSpecificShow = async (id: string) => {
  const response = await apiShowClient.get(`/shows/${id}`);
  return response;
};

export default apiShowClient;
