
import {ThemeContext} from "./ThemeContext"
import {AuthContext} from "./AuthContext"

export default function AppProvider({children})
{
    return <AuthContext>
                <ThemeContext>
                    {children}
                </ThemeContext>
            </AuthContext>
}