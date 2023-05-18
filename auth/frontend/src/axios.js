import axiosClient from "axios";

const axios = axiosClient.create({
  baseURL: `http://localhost:8181/api`,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      const { response } = error;
      const originalRequest = error.config;
      if (response && response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (e) {
      console.error(e);
    }

    throw error;
  }
);
export default axios;
