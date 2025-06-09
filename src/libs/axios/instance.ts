import environment from "@/config/environment";
import axios from "axios";

const headers = {
    "Content-Type": "application/json"
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000,
});

// Simple request interceptor without NextAuth.js
instance.interceptors.request.use(
    (request) => {
        // Get token from localStorage if available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
        }
        return request;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default instance;