import axios from "axios";
export const BASE_URL = 'http://localhost:3000/api/v1';
export const axiosPublic = axios.create({
  baseURL:BASE_URL,
  headers: { 'Content-Type':'application/json' }
});

export function createAxiosPrivate({getAccessToken, onRefresh, onLogout}){
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });

const request = instance.interceptors.request.use(
  (config) => {
    const token = tpeof (getAccessToken) === 'function' ? getAccessToken() : null;
    if (token){
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },(error)=>Promise.resject(error)
)

const response = instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error?.config;
    if(!originalRequest) return Promise.reject(error);
    if(error.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;
      if(typeof onRefresh === 'function'){
        try{
          const newAccess = await onRefresh();
          if ( newAccess){
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization =  `Bearer ${newAccess}`;
            return instance(originalRequest);
          }
        } catch (e){

        }
      }
      if(typeof onLogout === 'function') onLogout();
    }
    return Promise.reject(error);
  }
);

instance._ejectInterceptors = () =>{
  instance.interceptors.request.eject(request);
  instance.interceptors.response.eject(response)
}

return instance;


}








































// import axios from 'axios';
// import { useEffect } from 'react';
// import useAuth from '../Context/AuthContext';
// import useRefreshToken from '../Hooks/useRefreshToken';
// import { getLocalData, setLocalData } from '../Hooks/useLocalStorage';
// // const BASE_URL = 'http://172.16.27.124:3000/api/v1';
// const BASE_URL = 'http://localhost:3000/api/v1';
// //  to make it clear this api thing is needed to only create axios instance and to attach access token to the request and if expired to get new access token by calling the refreshtoken file
// export const axiosPublic = axios.create({
//   baseURL: BASE_URL,
// });
// const refresher = useRefreshToken();

// // export const useAxiosPrivate = () => {

//   // const {logout} = useAuth();
  
//   const axiosPrivate =axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: { 'Content-Type': 'application/json' },
  
// });

//     axiosPrivate.interceptors.request.use(
//       (config) => {
//         const accessToken = getLocalData('access');
//         // console.log(accessToken);
//         if (accessToken) {
//           config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     axiosPrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           //................................................... 
//           const newAccessToken = await refresher();
//           if (newAccessToken) {
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             setLocalData('access',newAccessToken)
//             return axiosPrivate(originalRequest);
//           }
//           else{
//             useAuth().logout();
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
// //     return () => {
// //                 axiosPrivate.interceptors.request.eject(reqInterceptor);
// //                 axiosPrivate.interceptors.response.eject(resInterceptor);
// //             };


// // },[ axiosPrivate ])
// // return axiosPrivate;
// // }

// export {axiosPrivate}