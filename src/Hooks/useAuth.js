import React, { createContext } from 'react'
const AuthContext=createContext(null);

export function AuthProvider({children}) 
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
            <AuthContext.Provider value={{auth, login, logout,setAccessToken}}>
            {children}
            </AuthContext.Provider>
        )
    }


export default function useAuth()
    {
        return useContext(AuthContext)
    }