import React, { useEffect } from 'react'
import useAuth from '../Context/useAuth'
import useRefreshToken from './useRefreshToken';
import {axiosPrivate} from '../api/axiosInstance'
// import {axios as axiosPrivate} from '../api/axios';

// const BASE = "172.16.27.124:3000"
function useAxiosPrivate() {
    // const {auth, setAccessToken, logout } = useAuth()
    const {auth, logout } = useAuth();
    const refresh = useRefreshToken();

    // const axiosPrivate = axios.create({
    //     baseURL:BASE,
    //     withCredentials: true,
    // });

    useEffect(()=>{
        
    
        //request interceptor to add access token
        const reqInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                const access = localStorage.getItem("access")
                if(access) config.headers.Authorization=`Bearer ${access}`
                // if (!config.headers["Authorization"] && auth?.accessToken){
                //     config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
                // }
                return config;
            },
            (error) => Promise.reject(error)
        );

        //response interceptor to handle 401 -> refresh
        const resInterceptor = axiosPrivate.interceptors.response.use(
            (response) =>response,
            async (error) =>{
                const originalRequest = error?.config; //axios stores the original request details inside error.config

                if(error.response?.status === 401 && !originalRequest._retry){//originalRequest.sent
                    originalRequest._retry = true;

                    const newAccess = await refresh();
                    if(newAccess){
                        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                        // originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
                        return axiosPrivate(originalRequest)
                    }
                    else{
                        logout()
                    }
                    // try{

                    //     const res = await axios.post(`${BASE}/refresh-token`,{},{withCredentials:true});
                    //     const newAccessToken = res.data.accessToken;
                    //     setAccessToken(newAccessToken);

                    //     originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    //     return axiosPrivate(originalRequest);

                    // } catch (err) {
                    //     await logout();
                    //     return Promise.reject(err)
                    // }                    
                }
                return Promise.reject(error)
            }
        );
        


        return () => {
            axiosPrivate.interceptors.request.eject(reqInterceptor);
            axiosPrivate.interceptors.response.eject(resInterceptor);
        };
    // },[auth?.accessToken, setAccessToken, logout]);
    },[logout,refresh]);


    return axiosPrivate;

}

export default useAxiosPrivate




//to use this

//const axiosPrivate = useAxiosPrivate();
//const res = await axiosPrivate.get("/profile")