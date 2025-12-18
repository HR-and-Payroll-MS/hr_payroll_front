
import {ThemeContext} from "./ThemeContext"
import {AuthContextProvider} from "./AuthContext"
import { NetworkProvider } from "./NetworkContext"
import { SocketProvider } from "./SocketProvider"
import { NotificationProvider } from "./NotificationProvider"
import { TableProvider } from "./TableProvider"

export default function AppProvider({children})
{
    return <AuthContextProvider>
              <SocketProvider>
                <NetworkProvider>
                  <NotificationProvider>
                   <TableProvider> 
                     <ThemeContext>
                       {children}
                     </ThemeContext>
                    </TableProvider>
                  </NotificationProvider>
                </NetworkProvider>
              </SocketProvider>
            </AuthContextProvider>
}
















    // return <AuthContext>
    //             <ThemeContext>
    //                 {children}
    //             </ThemeContext>
    //         </AuthContext>