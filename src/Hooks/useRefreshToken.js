import { useCallback } from "react";
import { axiosPublic } from "../api/axiosInstance";

export default function useRefreshToken(){
  const refresh = useCallback(async () => {
    try{
      const refreshToken = localStorage.getItem('refresh');
      if (!refreshToken) return null;
      const res = await axiosPublic.post('/auth/jwt/refresh',{refresh: refreshToken ,})
      const newAccess = res?.data?.access;
      if(newAccess){
        localStorage.setItem('access',newAccess);
        return newAccess;
      }
      return null;
    }
    catch( error ){
      console.error('useRefreshToken: refresh failed """ useRefreshToken.js .18', error);
      return null;
    }
  },[])

  return refresh;
}


// import axios from 'axios';

// const useRefreshToken = () => {
//   const refresh = async () => {
//     const storedRefresh = localStorage.getItem('refresh');
//     if (!storedRefresh) return null;

//     try {
//       const response = await axios.post('http://localhost:8000/auth/jwt/refresh', {
//         refresh: storedRefresh,
//       });

//       const newAccess = response.data.access;
//       localStorage.setItem('access', newAccess);
//       return newAccess;
//     } catch (err) {
//       console.error('Failed to refresh token:', err);
//       return null;
//     }
//   };

//   return refresh;
// };

// export default useRefreshToken;