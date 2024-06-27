import axios from 'axios';
// import { BASE_URL } from './constant';
const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance;

