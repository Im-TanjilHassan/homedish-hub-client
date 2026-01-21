import axios from "axios";

const envBase = import.meta.env.VITE_API_URL;
const fallback = "https://homedish-hub-server.vercel.app";
const baseURL = envBase || fallback;

if (!envBase) {
  console.warn("VITE_API_URL is not set. Using fallback API URL:", baseURL);
}
console.debug("axiosPublic baseURL:", baseURL);

const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosPublic;
