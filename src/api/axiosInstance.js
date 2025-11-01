import axios from 'axios';
// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://172.16.27.124:3000/api/v1';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await useRefreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosPrivate(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);





// import axios from "axios";
// const BASE_URL = "http://localhost:8000";
// export const axiosPublic = axios.create({
//     baseURL:BASE_URL,
// });

// export const axiosPrivate = axios.create({
//     baseURL:BASE_URL,
//     headers:{"Content-Type":"application/json"},
//     withCredentials:true,
// })