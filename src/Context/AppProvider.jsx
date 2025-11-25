
import {ThemeContext} from "./ThemeContext"
// import {AuthContext, AuthContextProvider} from "./AuthContext"
import {AuthContextProvider} from "./AuthContext"
import { NetworkProvider } from "./NetworkContext"

export default function AppProvider({children})
{
    return <AuthContextProvider>
              <NetworkProvider>
                <ThemeContext>
                    {children}
                </ThemeContext>
              </NetworkProvider>
            </AuthContextProvider>
    // return <AuthContext>
    //             <ThemeContext>
    //                 {children}
    //             </ThemeContext>
    //         </AuthContext>
}