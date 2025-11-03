import React, { createContext, useContext, useEffect, useState,useCallback,useMemo } from 'react';
import {setLocalData , getLocalData} from '../Hooks/useLocalStorage'
import axios from 'axios';
import useRefreshToken  from '../Hooks/useRefreshToken'
import { createAxiosPrivate, axiosPublic } from '../api/axiosInstance'
const AuthContext = createContext(null);

export function AuthContextProvider({ children }){

  const [auth,setAuth] = useState({user:null, accessToken:null})
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const refreshFn = useRefreshToken();
  const logout = useCallback(() => {
    try{
        localStorage.clear();
    } catch (e) { console.error('error from the logout .13 :',e)}
    setAuth({ user:null,accessToken:null });
  },[])

  const onRefresh = useCallback(async () => {
    const newAccess = await refreshFn();
    if (newAccess) {
      setAuth(prev => ({...prev, accessToken: newAccess }));
      setLocalData('access',newAccess)
      return newAccess;
    }
    return null
  },[refreshFn])

  const getAccessToken = useCallback(()=>{
    return getLocalData('access') || auth.accessToken || null;
  },[auth.accessToken])

  const axiosPrivate = useMemo(() => {
    return createAxiosPrivate({
      getAccessToken,
      onRefresh,
      onLogout:logout,
    });
  },[getAccessToken, onRefresh, logout])

  useEffect(()=>{
    return ()=>{
      if(axiosPrivate && typeof axiosPrivate._ejectInterceptors === 'function'){
        axiosPrivate._ejectInterceptors();
      }
    };
  },[axiosPrivate])

  const setUser = useCallback((userData,accessToken) => {
    if(!userData || !accessToken) return;
    setLocalData('id',userData.username);
    setLocalData('role',userData.groups?.[0]?? null);
    setLocalData('access',accessToken);
    setAuth({
      user: { username: userData.username, role:userData.groups?.[0] ?? null },accessToken
    })
  },[])

  const login = useCallback ( async (username, password) => {
    try {
      const res = await axiosPublic.post('/auth/jwt/create/',{username, password});
      const { access, refresh } = res.data || {};
      if ( !access || !refresh ) throw new Error('Invalid auth response from server');

      setLocalData('access',access);
      setLocalData('refresh',refresh);
 
      const userRes = await axiosPrivate.get('/auth/users/me/');
      const userData = userRes.data;

      setUser(userData, access);
      return userData;
    } catch (error) {
      const status = error?.response?.status
      if (error.status === 400) throw new Error("Please check your imput fields and try again")
      if (error.status === 401) throw new Error("Incorrect email or password. Please try again.")
      if (error.status === 403) throw new Error("You don't have permission to access this account.")
      if (error.status === 404) throw new Error("Server not found. Please try again later.")
      if (error.status === 500) throw new Error("Server error. Please try again later")
      const msg = error?.response?.data?.detail || error.message || "Something went wrong. Please try again.";
    throw new Error(msg)

    }
    
  },[axiosPrivate, setUser]);


  useEffect(() => {
    const access = getLocalData('access');
    const userId = getLocalData('id');
    const userRole = getLocalData('role');
    if(access && userId) {
      setAuth({user:{username:userId,role:userRole}, accessToken:acess});
    }
    setIsAuthLoading(false);
  },[])

  return (
    <AuthContext.Provider value = {{ auth , setAuth , isAuthLoading , login , logout , setUser , axiosPrivate }} >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error('useAuth must be used inside AuthcontextProvider');
  return ctx;
}














// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { axiosPublic ,axiosPrivate } from '../api/axiosInstance'
// import { setLocalData } from '../Hooks/useLocalStorage';
// const AuthContext = createContext(null);
// const BASE_URL = 'http://localhost:3000/api/v1';

// export function AuthContextProvider({ children }) {
//   const [auth, setAuth] = useState({user: null,accessToken: null,});
//   const [isAuthLoading, setIsAuthLoading] = useState(true);
//   const setUser = (userData, accessToken) => {
//     if (!userData || !accessToken) return;

//     setLocalData('id', userData?.username);
//     setLocalData('role', userData?.groups?.[0]);

//     setAuth({user: { username: userData?.username, role: userData?.groups?.[0] }, accessToken,});};

//   const login = async (username, password) => {
//     try {
//       const response = await axiosPublic.post(`/auth/jwt/create/`,{ username , password} )
//       const { access, refresh } = response.data;
//       localStorage.setItem('access', access);
//       localStorage.setItem('refresh', refresh);

//       const userResponse = await axiosPrivate.get(`/auth/users/me/`);

//       const userData = userResponse.data;
//       console.log(userData)
//       setLocalData('id', userData?.username);
//       setLocalData('role', userData?.groups?.[0]);
//       setAuth({
//         user: { username: userData?.username, role: userData?.groups?.[0] },
//         accessToken: access,
//       });

//       return userData;
//     } catch (error) {
//       if (error.status === 400) throw new Error("Please check your imput fields and try again")
//       else if (error.status === 401) throw new Error("Incorrect email or password. Please try again.")
//       else if (error.status === 403) throw new Error("You don't have permission to access this account.")
//       else if (error.status === 404) throw new Error("Server not found. Please try again later.")
//       else if (error.status === 500) throw new Error("Server error. Please try again later")
//       else throw new Error("Something went wrong. Please try again.")
//     }
//   };

//   useEffect(() => {
//     const accessToken = localStorage.getItem('access');
//     const userId = localStorage.getItem('id');
//     const userRole = localStorage.getItem('role');

//     if (accessToken && userId && userRole) {
//       setAuth({
//         user: { username: userId, role: userRole },
//         accessToken,
//       });
//     }

//     setIsAuthLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     setAuth({ user: null, accessToken: null });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         auth,
//         setAuth,
//         isAuthLoading,
//         login,
//         logout,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default function useAuth() {
//   return useContext(AuthContext);
// }