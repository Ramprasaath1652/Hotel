import axios from "axios";
import { showLoader, hideLoader } from "../utils/loader";

let activeRequests = 0;

const axiosInstance = axios.create({
  baseURL: "https://gtfin.in/abnapi/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    activeRequests++;
    showLoader(); // .NET beginRequest
    return config;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) hideLoader();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) hideLoader(); // .NET endRequest
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) hideLoader();
    return Promise.reject(error);
  }
);

export default axiosInstance;
