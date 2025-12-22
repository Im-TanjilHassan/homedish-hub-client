import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.API_URL,
    withCredentials: true,
});
 
export default axiosPublic;