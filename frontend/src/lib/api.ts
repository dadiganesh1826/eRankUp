import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
// Hardcoding your specific Render URL as a safety fallback
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://erankup.onrender.com';

const api = axios.create({
    baseURL: isProd ? backendUrl : '/api',
    timeout: 300000, // 5 minutes for AI parsing tasks
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
    (config: any) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login if 401 Unauthorized
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
