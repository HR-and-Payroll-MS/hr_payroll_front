
import {ThemeContext} from "./ThemeContext"
import {AuthContextProvider} from "./AuthContext"
import { NetworkProvider } from "./NetworkContext"
import { SocketProvider } from "./SocketProvider"
import { NotificationProvider } from "./NotificationProvider"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TableProvider } from "./TableContext"
export default function AppProvider({children})
{
    return <AuthContextProvider>
              <SocketProvider>
                <NetworkProvider>
                  <NotificationProvider>
                    <TableProvider>
                     <ThemeContext>
                      {/* <CssBaseline /> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {children}
                      </LocalizationProvider>
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