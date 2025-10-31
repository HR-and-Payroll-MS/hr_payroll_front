
import {ThemeContext} from "./ThemeContext"
// import {AuthContext, AuthContextProvider} from "./AuthContext"
import {AuthContextProvider} from "./AuthContext"

export default function AppProvider({children})
{
    return <AuthContextProvider>
                <ThemeContext>
                    {children}
                </ThemeContext>
            </AuthContextProvider>
    // return <AuthContext>
    //             <ThemeContext>
    //                 {children}
    //             </ThemeContext>
    //         </AuthContext>
}