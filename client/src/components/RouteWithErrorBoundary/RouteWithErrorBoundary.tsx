import { ReactNode } from "react";
import ErrorBoundary from "../../utils/ErrorBoundary"
import { useLocation } from "react-router-dom"

interface RouteWithErrorBoundaryProps {
    children: ReactNode
}

export const RouteWithErrorBoundary = ({ children }: RouteWithErrorBoundaryProps) => {
    const location = useLocation()
    return (
        <ErrorBoundary key={location?.pathname}>
            {children}
        </ErrorBoundary>
    );
};