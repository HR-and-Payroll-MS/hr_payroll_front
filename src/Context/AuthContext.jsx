import React, { createContext, useContext, useState } from 'react'
const Authcontext=createContext(null);

export function AuthContext({children}) 
    {
        const [auth, setAuth] = useState({
            user:null,
            accessToken:null,
        });

        const login =({accessToken, user})=>{
            setAuth({user,accessToken});
        }

        const logout =async()=>{
            try{
                await axios.post("url.werwerwe.werwe.werwe",
                    {},
                    {withCreadentials:true});
            } catch(e){
                console.log(e) 
            } finally{
                setAuth({user:null,accessToken:null});
            }
        };

        const setAccessToken =(accessToken) => {
            setAuth((prev)=>({...prev, accessToken}));
        };

        return(
            <Authcontext.Provider value={{auth, login, logout,setAccessToken}}>
            {children}
            </Authcontext.Provider>
        )
    }


export default function useAuth()
    {
        return useContext(Authcontext)
    }