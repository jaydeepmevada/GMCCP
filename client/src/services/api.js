import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gmccp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('gmccp_token');
      localStorage.removeItem('gmccp_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
