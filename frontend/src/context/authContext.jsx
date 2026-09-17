import { useState, createContext, useContext, useEffect } from "react";
import { refreshService, logoutService, loginService } from '../services/service.auth.js'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const login = async (form) => {
        try{
            const result = await loginService(form)
            setAccessToken(result.accessToken)
            setUser(result.user)

            return true

        }
        catch(err){
            toast.error(err.message)
            return false
        }
    }
    
    const logout = async () => {
        setAccessToken(null)
        setUser(null)
        const response = await logoutService()
        console.log(response)

    }


    useEffect(() => {
        refreshService(setAccessToken, setIsLoading, setUser, login );
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading, setIsLoading, user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export { AuthProvider, useAuth }