import { useState, createContext, useContext, useEffect } from "react";
import { refreshService, logoutService, loginService, registerService } from '../services/service.auth.js'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const login = async (form) => {
        try {
            const result = await loginService(form)
            setAccessToken(result.accessToken)
            setUser(result.user)
            toast.success(result.message || "Logged in successfully!")
            return true
        } catch (err) {
            toast.error(err.message || "Login failed")
            return false
        }
    }

    const register = async (form) => {
        try {
            const result = await registerService(form)
            setAccessToken(result.accessToken)
            setUser(result.user)
            toast.success(result.message || "Registration successful! Welcome!")
            return true
        } catch (err) {
            toast.error(err.message || "Registration failed")
            return false
        }
    }

    const logout = async () => {
        try {
            await logoutService()
            toast.info("Logged out successfully")
        } catch (err) {
            console.error(err)
        } finally {
            setAccessToken(null)
            setUser(null)
        }
    }

    useEffect(() => {
        refreshService(setAccessToken, setIsLoading, setUser);
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading, setIsLoading, user, setUser, login, register, logout }}>
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

export {
    AuthProvider,
    // eslint-disable-next-line react-refresh/only-export-components
    useAuth
}
