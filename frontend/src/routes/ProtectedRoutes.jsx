import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'

function ProtectedRoutes() {

    const { accessToken, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center min-h-screen">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#4800FF]">
                </div>
                <div className="text-sm text-gray-500">
                    Loading...
                </div>
            </div>
        )
    }
    return (!accessToken) ? <Navigate to='/login' replace /> : <Outlet />
}

export default ProtectedRoutes