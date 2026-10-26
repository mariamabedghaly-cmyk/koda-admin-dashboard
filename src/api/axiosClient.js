import axios from 'axios';

/**
 * Pre-configured Axios instance for Koda Store API
 * - Automatically injects JWT Bearer token from localStorage
 * - Handles auto-logout on 401 Unauthorized responses
 * - Automatically unwraps responses and simplifies error payloads
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-api-3wara.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

// Request Interceptor: Attach Auth Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('koda_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardize data & handle errors
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 401: Expired or invalid token -> clear session
      if (error.response.status === 401) {
        localStorage.removeItem('koda_token');
        localStorage.removeItem('koda_user');
        // Dispatch custom event so AuthContext can handle logout without window.location reload
        window.dispatchEvent(new Event('koda_auth_logout'));
      }

      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        `Error: ${error.response.statusText} (${error.response.status})`;

      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      return Promise.reject(new Error('Network error. Please check your internet connection or backend server.'));
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
