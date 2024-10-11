// http client helper
import axios from "axios";

const URL = import.meta.env.VITE_BASE_API_URL;
const axiosClient = axios.create({
  baseURL: URL,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = window.$cookies.get("token");

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// if 401 remove cookie and redirect to login
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
