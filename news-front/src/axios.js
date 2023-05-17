import axiosClient from "axios";

const axios = axiosClient.create({
  baseURL: `http://localhost:8000/api`,
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
      if (response && response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await axios.get("/auth/refresh");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + data.data.token;
          localStorage.setItem("ACCESS_TOKEN", data.data.token);
          return axios(originalRequest);
        } catch (e) {
          console.log("not refresh");
        }
      }
    } catch (e) {
      console.error(e);
    }

    throw error;
  }
);
export default axios;
