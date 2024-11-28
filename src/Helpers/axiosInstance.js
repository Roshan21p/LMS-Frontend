import axios from 'axios';

const BASE_URL = 'http://localhost:5173/api/v1';

const axiosInstance = axios.create(); // Create a new instance of axios

axiosInstance.defaults.baseURL = BASE_URL;

axiosInstance.defaults.withCredentials = true; // Allow cookies to be sent with requests

export default axiosInstance;
