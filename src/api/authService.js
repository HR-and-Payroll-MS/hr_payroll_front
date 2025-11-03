// // import useAxiosPrivate from "../Hooks/useAxiosPrivate";
// import { useAxiosPrivate } from "./axiosInstance";
// export const useUserService = () => {
//         //   console.log("response.data")
//     const axiosPrivate = useAxiosPrivate();
    
//     const getProfile = async (token) => {
//         const response = await axiosPrivate.get("/auth/users/me/",{
//             headers: token?{Authorization: `Bearer ${token}`}:{},
//         });
//         return response.data;
//     };

//     return getProfile;
// };