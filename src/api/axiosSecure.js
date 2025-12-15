import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is invalid / expired
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      console.error("Unauthorized or forbidden request");
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
