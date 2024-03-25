import { useAuth } from "../../context/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"

interface RouteProps {
    children: React.ReactNode
}

export const PrivateRoute = ({ children }: RouteProps) => {
    const { user } = useAuth();
    const location = useLocation()

    if (user === null) {
        return <Navigate to="/login" state={{from: location.pathname}} replace />
    }

    return children;
}