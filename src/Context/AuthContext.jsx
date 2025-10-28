import React, { createContext, useContext, useEffect, useState } from 'react'
import useRefreshToken from '../Hooks/useRefreshToken';
const Authcontext=createContext(null);
const BASE_URL="http://localhost:8000"

export function AuthContext({children}) 
    {
        const [auth, setAuth] = useState({
            user:null,
            accessToken:null,
        });
        const setUser=({accessToken, user})=>{
            localStorage.setItem("id",user?.id)
            localStorage.setItem("role",user?.role)
            setAuth({"user":user,"accessToken":accessToken});
            
        }
        useEffect(()=>{console.log("auth changed",auth)},[auth])
        const login = async (email, password) => {
            try{
                const response = await axios.post (`${BASE_URL}/auth/jwt/create`,{
                    email,
                    password,
                })

                const {access , refresh } = response.data;
                localStorage.setItem("access",access);
                localStorage.setItem("refresh",refresh);
                // setAccessToken(access);

                const userResponse = await axios.get(`${BASE_URL}/auth/users/me/`,{
                    headers:{Authorization:`Bearer ${access}`}
                });
                setUser(access,userResponse.data); // i was thinking about reciving data for format like this {user:"",role:""}
                return userResponse.data;
            }catch(error){
                console.error("login failed from the authcontext.js: ",error);
                throw error;
            }
        };


        const logout =async()=>{
            // try{
            //     await axios.post("url.werwerwe.werwe.werwe",
            //         {},
            //         {withCreadentials:true});
            // } catch(e){
            //     console.log(e) 
            // } finally{
            //     setAuth({user:null,accessToken:null});
            // }  this was needed if we were using the http only cookie method

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            setAuth({user:null,accessToken:null});

        };

        // const setAccessToken =({/*accessToken*/}) => {
        //     const refresh =useRefreshToken()
        //     setAuth((prev)=>({...prev, refresh}));
        // };


        /* 
            *auth :-contain access token and user object{id,role} in the memory/variable
            *login:-first request new access and refresh token and then get the user object using the access token 
            *logout :- remove every thing from the local storage and from the auth
            *setAccessToken :- simply add the new valid access token only 
            *setUser :- fill the user info to the auth and to the local storage
        
        */

        return(
            <Authcontext.Provider value={{auth, login, logout,setUser}}>{/* {setAccessToken} */}
            {children}
            </Authcontext.Provider>
        )
    }


export default function useAuth()
    {
        return useContext(Authcontext)
    }