import axios from "axios";

const DEBUG = process.env.NODE_ENV === "development";

export const axiosClient = () => {
  let axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: "application/json",
    },
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      let token = JSON.parse(window.localStorage.getItem("referrer-user"))?.token;
      // let token = window.localStorage.getItem("referrer-token");

      if (token !== null && typeof token !== 'string') {
        token = JSON.parse(token);
      }

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      if (DEBUG) {
        console.error("✉️ ", error);
      }
      if(error?.response?.status == 401){
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        alert("You are not authorized");
      }
      return response;
    },
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );

  return axiosInstance;
};
