import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { Loader2 } from 'lucide-react';

function ProtectedRoutes() {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#4800FF]" />
        <span className="text-sm font-medium">Loading session...</span>
      </div>
    );
  }

  return !accessToken ? <Navigate to="/login" replace /> : <Outlet />;
}

export default ProtectedRoutes;
