
import {ThemeContext} from "./ThemeContext"
import {AuthContextProvider} from "./AuthContext"
import { NetworkProvider } from "./NetworkContext"
import { SocketProvider } from "./SocketProvider"

export default function AppProvider({children})
{
    return <AuthContextProvider>
              <SocketProvider>
                <NetworkProvider>
                  <ThemeContext>
                      {children}
                  </ThemeContext>
                </NetworkProvider>
              </SocketProvider>
            </AuthContextProvider>
}
















    // return <AuthContext>
    //             <ThemeContext>
    //                 {children}
    //             </ThemeContext>
    //         </AuthContext>