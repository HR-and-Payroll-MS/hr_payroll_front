import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { setLocalData } from '../Hooks/useLocalStorage';
// import useRefreshToken from '../Hooks/useRefreshToken'; // optional, not used currently
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const BASE_URL = 'http://localhost:3000/api/v1';

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
  });
  const [error,setError] = useState("")
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const setUser = (userData, accessToken) => {
    if (!userData || !accessToken) return;

    setLocalData('id', userData?.username);
    setLocalData('role', userData?.groups?.[0]);

    setAuth({
      user: { username: userData?.username, role: userData?.groups?.[0] },
      accessToken,
    });
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/jwt/create/`, {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      const userResponse = await axios.get(`${BASE_URL}/auth/users/me/`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userData = userResponse.data;
      setLocalData('id', userData?.username);
      setLocalData('role', userData?.groups?.[0]);
      setAuth({
        user: { username: userData?.username, role: userData?.groups?.[0] },
        accessToken: access,
      });

      return userData;
    } catch (error) {
      if (error.status === 400) throw new Error("Please check your imput fields and try again")
      else if (error.status === 401) throw new Error("Incorrect email or password. Please try again.")
      else if (error.status === 403) throw new Error("You don't have permission to access this account.")
      else if (error.status === 404) throw new Error("Server not found. Please try later.")
      else if (error.status === 500) throw new Error("Server error. Please try again later")
      else throw new Error("Something went wrong. Please try again.")
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const userId = localStorage.getItem('id');
    const userRole = localStorage.getItem('role');

    if (accessToken && userId && userRole) {
      setAuth({
        user: { username: userId, role: userRole },
        accessToken,
      });
    }

    setIsAuthLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    setAuth({ user: null, accessToken: null });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAuthLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}




















// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { setLocalData } from '../Hooks/useLocalStorage';
// import useRefreshToken from '../Hooks/useRefreshToken';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext(null);
// const BASE_URL = 'http://172.16.27.124:3000/api/v1';

// export function AuthContextProvider({ children }) {
  
//   // const navigate = useNavigate();
//   const [auth, setAuth] = useState({
//     user: null,
//     accessToken: null,
//   });
//   useEffect(() => {

//     console.log('auth changed', auth);
//   // if (auth?.user?.role === 'hr') navigate('/hr_dashboard');
//   // else if (auth?.user?.role === 'Manager') navigate('/manager_dashboard');
// }, [auth]);
//   const [isAuthLoading, setIsAuthLoading] = useState(true); // Loading state

//   const setUser = (username, password) => {

//    login(username, password).then((user) => { 
    
//     console.log("seud",user)

//       // localStorage.setItem('id', user?.username);
//       setLocalData('id', user?.username);
//       // localStorage.setItem('role', user?.groups[0]);
//       setLocalData('role', user?.groups[0]);

//       setAuth({ user:{username:user?.username, role:user?.groups[0]}, accessToken: localStorage.getItem('access') });
//    }).catch((error) => { console.error("Error setting user:", error); });



    
//     // localStorage.setItem('id', user?.id);
//     // localStorage.setItem('role', user?.role);
//     // console.log('Setting user in auth context:', user);
//     // setAuth({ user, accessToken });
//   };

//   useEffect(() => {
//     const accessToken = localStorage.getItem('access');
//     const userId = localStorage.getItem('id');
//     const userRole = localStorage.getItem('role');

//     if (accessToken && userId && userRole) {
//       setUser({
//         accessToken,
//         user: { id: userId, role: userRole },
//       });
//     }
//     setIsAuthLoading(false); // Done loading
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/jwt/create/`, {
//         username,
//         password,
//       });

//       const { access, refresh } = response.data;

//       console.log(response.data);
//       localStorage.setItem('access', access);
//       localStorage.setItem('refresh', refresh);

//       const userResponse = await axios.get(`${BASE_URL}/auth/users/me/`, {
//         headers: { Authorization: `Bearer ${access}` },

//       });
//       //   console.log("userResponse.data: ",userResponse.data)

//       // setUser({ accessToken: access, user: userResponse.data?.groups[0] });
//       return userResponse.data;
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     localStorage.removeItem('id');
//     localStorage.removeItem('role');
//     setAuth({ user: null, accessToken: null });
//   };

//   return (
//     <AuthContext.Provider value={{ auth, setUser,setAuth, isAuthLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default function useAuth() {
//   return useContext(AuthContext);
// }















// import React, { createContext, useContext, useEffect, useState } from 'react'
// import useRefreshToken from '../Hooks/useRefreshToken';
// const Authcontext=createContext(null);
// const BASE_URL="http://localhost:8000"

// export function AuthContext({children}) 
//     {
//         const [auth, setAuth] = useState({
//             user:null,
//             accessToken:null,
//         });
//         const setUser=({accessToken, user})=>{
//             localStorage.setItem("id",user?.id)
//             localStorage.setItem("role",user?.role)
//             setAuth({"user":user,"accessToken":accessToken});
            
//         }
//         useEffect(()=>{console.log("auth changed",auth)},[auth])
//         const login = async (email, password) => {
//             try{
//                 const response = await axios.post (`${BASE_URL}/auth/jwt/create`,{
//                     email,
//                     password,
//                 })

//                 const {access , refresh } = response.data;
//                 localStorage.setItem("access",access);
//                 localStorage.setItem("refresh",refresh);
//                 // setAccessToken(access);

//                 const userResponse = await axios.get(`${BASE_URL}/auth/users/me/`,{
//                     headers:{Authorization:`Bearer ${access}`}
//                 });
//                 setUser(access,userResponse.data); // i was thinking about reciving data for format like this {user:"",role:""}
//                 return userResponse.data;
//             }catch(error){
//                 console.error("login failed from the authcontext.js: ",error);
//                 throw error;
//             }
//         };


//         const logout =async()=>{
//             // try{
//             //     await axios.post("url.werwerwe.werwe.werwe",
//             //         {},
//             //         {withCreadentials:true});
//             // } catch(e){
//             //     console.log(e) 
//             // } finally{
//             //     setAuth({user:null,accessToken:null});
//             // }  this was needed if we were using the http only cookie method

//             localStorage.removeItem("access");
//             localStorage.removeItem("refresh");
//             localStorage.removeItem("id");
//             localStorage.removeItem("role");
//             setAuth({user:null,accessToken:null});

//         };

//         // const setAccessToken =({/*accessToken*/}) => {
//         //     const refresh =useRefreshToken()
//         //     setAuth((prev)=>({...prev, refresh}));
//         // };


//         /* 
//             *auth :-contain access token and user object{id,role} in the memory/variable
//             *login:-first request new access and refresh token and then get the user object using the access token 
//             *logout :- remove every thing from the local storage and from the auth
//             *setAccessToken :- simply add the new valid access token only 
//             *setUser :- fill the user info to the auth and to the local storage
        
//         */

//         return(
//             <Authcontext.Provider value={{auth, login, logout,setUser}}>{/* {setAccessToken} */}
//             {children}
//             </Authcontext.Provider>
//         )
//     }


// export default function useAuth()
//     {
//         return useContext(Authcontext)
//     }