import { createContext, useContext, useState } from "react";


const themeContext = createContext();

export function ThemeContext({children})

{

    const [theme,setTheme]= useState({  state:"",
                                        light: "bg-white shadow dark:bg-slate-700 drop-shadow-2xl",
                                        dark: "bg-gray-50 dark:bg-slate-900",});

    const changeTheme = (variable)=>{
    if (variable === "") {
      setTheme({
        light: "bg-white shadow dark:bg-slate-700 drop-shadow-2xl",
        dark: "bg-gray-50 dark:bg-slate-900",
        state: variable,
      });
    } else {
      setTheme({
        dark: "bg-white shadow dark:bg-slate-700 drop-shadow-2xl",
        light: "bg-gray-50 dark:bg-slate-900",
        state: "dark",
      });
    }
  }

    return(
        <themeContext.Provider value={{theme, changeTheme}}>
            {children}
        </themeContext.Provider>
    )
}

export const useTheme=()=>{
    return useContext(themeContext);
}
