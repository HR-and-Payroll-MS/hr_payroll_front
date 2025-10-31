import axios from 'axios';

const useRefreshToken = () => {
  const refresh = async () => {
    const storedRefresh = localStorage.getItem('refresh');
    if (!storedRefresh) return null;

    try {
      const response = await axios.post('http://localhost:8000/auth/jwt/refresh', {
        refresh: storedRefresh,
      });

      const newAccess = response.data.access;
      localStorage.setItem('access', newAccess);
      return newAccess;
    } catch (err) {
      console.error('Failed to refresh token:', err);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;




// import axios from "axios";

// const useRefreshToken = () =>{
//     const refresh = async () => {
//         const storedRefresh =localStorage.getItem("refresh");
//         if(!storedRefresh) return null;

//         try{
//             const response = await axios.post(
//                 "http://localhost:8000/auth/jwt/refresh",
//                 {refresh:storedRefresh}
//             );
//             const newAccess = response.data.access;
//             localStorage.setItem("access",newAccess);
//             return newAccess;
//         }
//         catch (err){
//             console.error("failed to refresh token this code is found inside the  useRefreshToken.js  :",err);
//             return null;
//         }
//     }
//     return refresh;
// }
// export default useRefreshToken;