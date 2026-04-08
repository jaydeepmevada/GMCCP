import axios from 'axios';

const envApiBaseUrl = import.meta.env.VITE_API_URL?.trim();
const rawApiBaseUrl = envApiBaseUrl?.replace(/\/$/, '') || '/api';

if (typeof window !== 'undefined') {
  const isProductionHost = !['localhost', '127.0.0.1'].includes(window.location.hostname);
  const pointsToLocalBackend = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?/i.test(rawApiBaseUrl);
  const isSameOriginApi = rawApiBaseUrl === '/api';

  if (isProductionHost && !isSameOriginApi && (!envApiBaseUrl || pointsToLocalBackend)) {
    console.warn(
      'GMCCP API misconfiguration: set VITE_API_URL in your frontend deployment environment to your public backend URL.'
    );
  }
}

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
