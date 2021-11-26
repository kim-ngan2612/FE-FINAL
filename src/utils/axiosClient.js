import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: "http://localhost:7000/api/v1",
  paramsSerializer: (params) => {
    return qs.stringify(params, { skipNulls: true });
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("token");
    if (userInfo) {
      config.headers.token = userInfo;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          alert("Client error");
          break;
        case 403:
          break;
        default:
          return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
