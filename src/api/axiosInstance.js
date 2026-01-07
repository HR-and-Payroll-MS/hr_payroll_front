import axios from 'axios';

export const BASE_URL = (import.meta.env.VITE_BASE_URL || 'http://localhost:3000').replace(/\/$/, '') + '/api/v1';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export function createAxiosPrivate({ getAccessToken, onRefresh, onLogout }) {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error?.config;

      if (!originalRequest || originalRequest.url.includes('/auth/djoser/jwt/refresh/')) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          onRefresh()
            .then((newAccess) => {
              if (newAccess) {
                console.log('Token refreshed successfully. Retrying queued requests.');
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                processQueue(null, newAccess);
                resolve(instance(originalRequest));
              } else {
                throw new Error("Refresh failed: No token returned.");
              }
            })
            .catch((refreshError) => {
              processQueue(refreshError, null);
              console.error('Refresh token expired or invalid. Logging out.');
              if (typeof onLogout === 'function') onLogout();
              reject(refreshError);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );

  instance._ejectInterceptors = () => { };

  return instance;
}
