import axios from 'axios';

const rawApiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api';

export const API_BASE_URL = rawApiBaseUrl;
export const MEDIA_BASE_URL = rawApiBaseUrl.startsWith('http')
  ? rawApiBaseUrl.replace(/\/api$/, '')
  : '';

const API = axios.create({
  baseURL: API_BASE_URL,
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
